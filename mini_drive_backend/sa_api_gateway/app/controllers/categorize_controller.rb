class CategorizeController < ApplicationController

	@@emailid = ""
	before_action :validate
	before_action :isOwner, only: [:deleteAllCategories, :addCategories, :removeCategories]

	def showCategories
		fileId = params[:file_id]
		resultCategories = HTTParty.get(BASE_IP + ":3001/files/" + fileId.to_s)
		render json: resultCategories.body, status: resultCategories.code
	end

	def deleteAllCategories
		fileId = params[:file_id]
		results = HTTParty.delete(BASE_IP + ":3001/files/" + fileId.to_s)
		render json: results.body, status: results.code
	end

	def getFilesWithCategory
		categoryName = params[:category_name]
		resultFiles = HTTParty.get(BASE_IP + ":3001/category/" + categoryName.to_s)
		print resultFiles
		render json: resultFiles.body, status: resultFiles.code
	end

	def addCategories
		fileId = params[:file_id]
		categories = params[:categories]
		options = {
			:body => {
				:id => fileId,
				:categories => categories
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.post(BASE_IP + ":3001/addCategories", options)
		render json: results.body, status: results.code
	end

	def removeCategories
		fileId = params[:file_id]
		categories = params[:categories]
		options = {
			:body => {
				:id => fileId,
				:categories => categories
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.post(BASE_IP + ":3001/removeCategories", options)
		render json: results.body, status: results.code
	end

	private
		def isOwner
			currentFile = params[:file_id]
			results = HTTParty.get(BASE_IP + ":3003/hashdocuments/getOwner/" + currentFile.to_s)
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
			results = HTTParty.get(BASE_IP + ":3000/users/validate_token", options)
			if results.code == 202
				@@emailid = results['email']
			else
				render status: 401
			end
		end

end
