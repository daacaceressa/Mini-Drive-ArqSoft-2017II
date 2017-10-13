class ShareController < ApplicationController

	before_action :authenticate
	before_action :isOwner, only: [:postShares, :deleteShare]

	def getShares
		results = HTTParty.get(BASE_IP + ":3002/shares")
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
		results = HTTParty.post(BASE_IP + ":3002/shares", options)
		render status: results.code
	end

	def getMyShares
		results = HTTParty.get(BASE_IP + ":3002/shares/" + @@emailid)
		if results.code == 200
			print results
			paths = []
				cur_result = HTTParty.get(BASE_IP + ":3003/hashdocuments/" + idHash.to_s)
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
		results = HTTParty.delete(BASE_IP + ":3002/shares/" + sharedTo + "/" + sharedFile)
		render json: results.body, status: results.code
	end
	
end
