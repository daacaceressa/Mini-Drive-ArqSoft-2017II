require 'set'

class CategorizeController < ApplicationController

	@@emailid = ""
	before_action :authenticate
	#before_action :isOwner, only: [:deleteAllCategories, :addCategories, :removeCategories]

	def showCategories
		fileId = params[:file_id]
		resultCategories = HTTParty.get(BASE_IP + ":3001/files/" + fileId.to_s)
		render json: resultCategories.body, status: resultCategories.code
	end

	def getOwnCategories
		sharedFiles = HTTParty.get(BASE_IP + ":3002/shares/" + @@emailid)
		ownedFiles = HTTParty.get(BASE_IP + ":3003/hashdocuments/getOwnFiles/" + @@emailid)
		categories = []
		if sharedFiles.include? "files_id"
			sharedFiles["files_id"].each do |fileId|
				currentCategories = HTTParty.get(BASE_IP+":3001/files/" + fileId.to_s)
				if currentCategories.include? "categories"
					unless currentCategories["categories"].nil?
						categories += currentCategories["categories"]
					end
				end
			end
		end
		if ownedFiles.include? "filesId"
			ownedFiles["filesId"].each do |fileId|
				currentCategories = HTTParty.get(BASE_IP + ":3001/files/" + fileId.to_s)
				if currentCategories.include? "categories"
					unless currentCategories["categories"].nil?
						categories += currentCategories["categories"]
					end
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
		allFiles = HTTParty.get(BASE_IP + ":3001/category/" + categoryName.to_s)
		ownedFiles = HTTParty.get(BASE_IP + ":3003/hashdocuments/getOwnFiles/" + @@emailid)
		sharedFiles = HTTParty.get(BASE_IP + ":3002/shares/" + @@emailid)

		 puts "all", allFiles, "owned", ownedFiles, "share", sharedFiles

		if allFiles.code == 200
			results = []
			myFiles = []
			if ownedFiles.include? "filesId"
				ownedFiles["filesId"].each do |fileId|
					myFiles.push(fileId.to_s)
				end
			end

			if sharedFiles.include? "filesId"
				sharedFiles["filesId"].each do |fileId|
					myFiles.push(fileId.to_s)
				end
			end

			allFiles.each do |file|
				if file.include? "id"
					if myFiles.include? file["id"]
						file["name"] = ""
						tmpFile =  HTTParty.get(BASE_IP + ":3003/hashdocuments/" + file["id"].to_s)
						if tmpFile.include?"path"
							file["name"] = tmpFile["path"].split('/')[1]
						end
						results.push(file)
					end
				end
			end
			# Remove duplicates.
			results = (results.to_set).to_a
			render json: results, status: allFiles.code
		else
			render plain: allFiles.body, status:allFiles.code
		end
			
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

	def addCategory
		fileId = params[:file_id]
		categories = [ params[:category] ]
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

	def removeCategory
		fileId = params[:file_id]
		categories = [ params[:category] ]
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
