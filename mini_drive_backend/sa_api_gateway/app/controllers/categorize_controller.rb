class CategorizeController < ApplicationController

	def showCategories
		fileId = params[:file_id]
		resultCategories = HTTParty.get("http://192.168.99.102:3001/files/" + fileId.to_s)
		render json: resultCategories.body, status: resultCategories.code
	end

	def deleteAllCategories
		fileId = params[:file_id]
		results = HTTParty.delete("http://192.168.99.102:3001/files/" + fileId.to_s)
		render json: results.body, status: results.code
	end

	def getFilesWithCategory
		categoryName = params[:category_name]
		resultFiles = HTTParty.get("http://192.168.99.102:3001/category/" + categoryName.to_s)
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
		results = HTTParty.post("http://192.168.99.102:3001/addCategories", options)
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
		results = HTTParty.post("http://192.168.99.102:3001/removeCategories", options)
		render json: results.body, status: results.code
	end
end
