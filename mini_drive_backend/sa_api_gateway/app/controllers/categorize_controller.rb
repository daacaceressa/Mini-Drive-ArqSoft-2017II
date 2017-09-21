class CategorizeController < ApplicationController

	@userId = params[user_id]

	def checkFile(id)
		results = HTTParty.get("http://192.168.99.102:3000/users/" + id.to_s)
		return results
	end


end
