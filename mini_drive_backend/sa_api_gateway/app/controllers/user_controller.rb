require 'json'

class UserController < ApplicationController

	def validate
		@token = request.headers['AUTHTOKEN']
		options = {
			:body => {
				:X_AUTH_TOKEN => @token
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.get(BASE_IP + ":3000/users/validate_token", options)
		if results.code == 202
			render results['email'], status: results.code
		else
			response.headers['AUTHTOKEN']= ""
			render status: 401
		end
	end

	def logOut
		@token = request.headers['AUTHTOKEN']
		options = {
			:body => {
				:X_AUTH_TOKEN => @token
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.delete(BASE_IP + ":3000/users/sign_out", options)
		if results.code == 200
			response.headers['AUTHTOKEN']= ""	
			render status: 200		
		else
			render status: 400
		end			
	end

	def createUser
		@email = params[:email]
		@password = params[:password]
		@password_confirmation = params[:password_confirmation]

		options = {
			:body => {
				:email => @email,
				:password => @password,
				:password_confirmation => @password_confirmation,
				:nick => @email,
				:name => @email
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}

		resultsLDAP = HTTParty.post(BASE_IP + ":4001/user/resources/ldapcruds", options)
		if resultsLDAP.code == 201	
			results = HTTParty.post(BASE_IP + ":3000/users", options)
			if results.code == 201
	  			return render json: {"status" => 201, "message" => "User Created"}, status: 201
			else
				HTTParty.delete(BASE_IP + ":4001/user/resources/ldapcruds/"+@email.to_s)
	  			return render json: {"status" => 400, "message" => "There was an error in the server"}, status: 400
	   		end

		else
			return render json: {"status" => 400, "message" => "invalid email"}, status: 400
		end		
	end

	def loginUser
		@email = params[:email]
		@password = params[:password]
		options = {
			:body => {
				:email => @email,
				:password => @password
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}

		resultsLDAP = HTTParty.post(BASE_IP + ":4001/user/resources/ldap", options)
		#puts resultsLDAP;
		#puts resultsLDAP.parsed_response;
		# puts resultsLDAP[:login];
		auth =  JSON.parse(resultsLDAP)["login"];
		#puts "-----------------------------------------------";
		if auth == "True"
			results = HTTParty.post(BASE_IP + ":3000/users/sign_in", options)
			if results.code == 201
				response.headers['AUTHTOKEN'] = results['X_AUTH_TOKEN']
			end
			render status: results.code
		else
			render status: 401	
		end
	end
end
