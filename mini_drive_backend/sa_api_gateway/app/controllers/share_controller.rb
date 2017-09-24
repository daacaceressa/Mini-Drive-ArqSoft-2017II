class ShareController < ApplicationController

	@@emailid = ""
	before_action :validate

	def getShares
		results = HTTParty.get("http://192.168.99.102:3002/shares")
		render json: results.body, status: results.code
	end

	def postShares
		sharedFile = params[:shared_file]
		#render json: sharedFiles.to_json
		options = {
			:body => {
				:user_id => @@emailid,
				:file_id => sharedFile
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.post("http://192.168.99.102:3002/shares", options)
		render json: results.body, status: results.code
	end

	def sharesById
		results = HTTParty.get("http://192.168.99.102:3002/shares/" + @@emailid)
		render json: results.body, status: results.code
	end

	def deleteShare
		filename = params[:fileId]
		results = HTTParty.delete("http://192.168.99.102:3002/shares/" + @@emailid + "/" + filename)
		render plain: results.body, status: results.code
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
		if results.code == 202
			@@emailid = results['email']
		else
			#response.headers['AUTHTOKEN']= ""
			render status: 401
			#redirect_to "http://192.168.99.102:7000/sign_in"
		end
	end
end
