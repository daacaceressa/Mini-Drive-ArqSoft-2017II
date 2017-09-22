class CategorizeController < ApplicationController

	def getCategories(id)
		results = HTTParty.get("http://192.168.99.102:3001/files" + id.to_s)
		return results
	end

	def getCategories(category)
		results = HTTParty.get("http://192.168.99.102:3001/category" + category.to_s)
		return results
	end

	def addCategory(newCa)
		options = {
			:body => {
				:id => id,
				:categories => newCa
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.post("http://192.168.99.102:3001/addCategories/", options)
		render json: results
	end

	def removeCategory(rmCa)
		options = {
			:body => {
				:id => id,
				:categories => rmCa
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.delete("http://192.168.99.102:3001/addCategories/", options)
		render json: results
	end


end
