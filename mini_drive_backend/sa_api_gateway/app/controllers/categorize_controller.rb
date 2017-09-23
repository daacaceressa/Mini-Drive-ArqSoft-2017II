class CategorizeController < ApplicationController

	def getCategories(id)
		results = HTTParty.get("http://192.168.99.102:3001/files" + id.to_s)
		return results
	end

	def getCategories(@category)
		results = HTTParty.get("http://192.168.99.102:3001/category" + @category.to_s)
		return results
	end

	




	def addCategory
		@Categories_arr = parama[:cat_arr]
		options = {
			:body => {
				:id => id,
				:categories => ["Fisica", "Quimica"] #.....
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.post("http://192.168.99.102:3001/addCategories/", options)
		render json: results
	end





	def removeCategory(rmCa)
		@Categories_arr = parama[:cat_arr]
		options = {
			:body => {
				:id => id,
				:categories => ["Fisica", "Quimica"] #.....
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.delete("http://192.168.99.102:3001/addCategories/", options)
		render json: results
	end


end
