class HashController < ApplicationController

	$emailid = ""
	before_action :validate 

	def postHash
		@path = params[:path]
		options = {
			:body => {
				:path => $email
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}

		}
		results = HTTParty.post("http://192.168.99.102:3003/hashdocuments", options)
		render json: results.code

	end

	def getHash
		results = HTTParty.get("http://192.168.99.102:3003/hashdocuments")
		return results
		#render json: results.code
	end

	def getHashId(id)
		results = HTTParty.get("http://192.168.99.102:3003/hashdocuments" + id.to_s)
		return results
		#render json: results.code
	end

	def getHashByPath(path)
		results = HTTParty.get("http://192.168.99.102:3003/hashdocuments/getByPath" + path.to_s)
		return results
		#render json: results.code
	end

	def putHash(id) ###########Review
		results = HTTParty.put("http://192.168.99.102:3003/hashdocuments" + id.to_s)
		return results
		#render json: results.code
	end

	def deleteHash(id)
		results = HTTParty.delete("http://192.168.99.102:3003/hashdocuments" + id.to_s)
		return results
		#render json: results.code
	end
	
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
		#render json: results.code
		if results.code == 202
			$emailid = results['email']
			#render json: $emailid.to_json
		else
			#response.headers['AUTHTOKEN']= ""
			render status: 401
			#redirect_to "http://192.168.99.102:7000/sign_in"
		end
	end

	private
end

