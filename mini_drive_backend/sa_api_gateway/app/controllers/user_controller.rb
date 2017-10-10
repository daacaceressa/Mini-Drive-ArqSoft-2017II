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
		results = HTTParty.get("http://192.168.99.102:3000/users/validate_token", options)
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
		results = HTTParty.delete("http://192.168.99.102:3000/users/sign_out", options)
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
		#Validation para emails repetidos?????
		options = {
			:body => {
				:email => @email,
				:password => @password,
				:password_confirmation => @password_confirmation
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}

		}
		results = HTTParty.post("http://192.168.99.102:3000/users", options)
		render json: results.body, status: results.code
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
		results = HTTParty.post("http://192.168.99.102:3000/users/sign_in", options)
		if results.code == 201
			response.headers['AUTHTOKEN'] = results['X_AUTH_TOKEN']
		end
		render status: results.code
	end
end
