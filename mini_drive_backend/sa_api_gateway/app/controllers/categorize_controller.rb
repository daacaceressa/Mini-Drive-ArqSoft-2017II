require 'set'

class CategorizeController < ApplicationController

	@@emailid = ""
	before_action :authenticate
	before_action :isOwner, only: [:deleteAllCategories, :addCategories, :removeCategories]

	def showCategories
		fileId = params[:file_id]
		resultCategories = HTTParty.get(BASE_IP + ":3001/files/" + fileId.to_s)
		render json: resultCategories.body, status: resultCategories.code
	end

	def getOwnCategories
		sharedFiles = HTTParty.get("http://192.168.99.102:3002/shares/" + @@emailid)
		ownedFiles = HTTParty.get("http://192.168.99.102:3003/hashdocuments/getOwnFiles/" + @@emailid)
		categories = []
		sharedFiles["files_id"].each do |fileId|
			currentCategories = HTTParty.get("http://192.168.99.102:3001/files/" + fileId.to_s)
			unless currentCategories["categories"].nil?
				categories += currentCategories["categories"]
			end
		end
		if ownedFiles["total"] > 0
			ownedFiles["filesId"].each do |fileId|
				currentCategories = HTTParty.get("http://192.168.99.102:3001/files/" + fileId.to_s)
				unless currentCategories["categories"].nil?
					categories += currentCategories["categories"]
				end
			end
		end
		categories = categories.to_set
		categories = categories.to_a
		render json: {total: categories.length, categories: categories}, status: 200
	end

	def deleteAllCategories
		fileId = params[:file_id]
		results = HTTParty.delete(BASE_IP + ":3001/files/" + fileId.to_s)
		render json: results.body, status: results.code
	end

	def getFilesWithCategory
		categoryName = params[:category_name]
		resultFiles = HTTParty.get(BASE_IP + ":3001/category/" + categoryName.to_s)
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
	
end
