class ShareController < ApplicationController

	@@emailid = ""
	before_action :validate
	before_action :isOwner, only: [:postShares, :deleteShare]

	def getShares
		results = HTTParty.get(ApplicationController::BASE_IP + ":3002/shares")
		render json: results.body, status: results.code
	end

	def postShares
		sharedTo = params[:user_id]
		sharedFile = params[:file_id]
		options = {
			:body => {
				:user_id => sharedTo,
				:file_id => sharedFile
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.post(ApplicationController::BASE_IP + ":3002/shares", options)
		render status: results.code
	end

	def getMyShares
		results = HTTParty.get(ApplicationController::BASE_IP + ":3002/shares/" + @@emailid)
		if results.code == 200
			paths = []
			results["files_id"].each do |idHash|
				cur_result = HTTParty.get(ApplicationController::BASE_IP + ":3003/hashdocuments/" + idHash.to_s)
				if cur_result.code == 200
					paths.push( cur_result["path"] )
				end
			end
			render json: {total: paths.length, files: paths}, status: 200
		else 
			render json: results.body, status: results.code
		end
	end

	def deleteShare
		sharedTo = params[:user_id]
		sharedFile = params[:file_id]
		results = HTTParty.delete(ApplicationController::BASE_IP + ":3002/shares/" + sharedTo + "/" + sharedFile)
		render json: results.body, status: results.code
	end

	private
		def isOwner
			currentFile = params[:file_id]
			results = HTTParty.get(ApplicationController::BASE_IP + ":3003/hashdocuments/getOwner/" + currentFile.to_s)
			if results.code != 200 || @@emailid != results["owner"]
				render status: 401
			end
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
			results = HTTParty.get(ApplicationController::BASE_IP + ":3000/users/validate_token", options)
			if results.code == 202
				@@emailid = results['email']
			else
				render status: 401
			end
		end
end
