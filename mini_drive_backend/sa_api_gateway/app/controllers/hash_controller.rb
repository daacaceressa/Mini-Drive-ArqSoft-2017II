class HashController < ApplicationController

def postHash
	@path = params[:path]
	options = {
		:body => {
			:path => @path
		}.to_json,
		:headers => {
			'Content-Type' => 'application/json'
		}

	}
	results = HTTParty.post("http://192.168.99.102:3003/hashdocuments", options)
	render json: results.code

end

def getHash
	results = HTTParty.get("http://192.168.99.102:3003/hashdocuments", options)
	return results
	#render json: results.code
end

def getHashId(id)
	results = HTTParty.get("http://192.168.99.102:3003/hashdocuments" + id.to_s)
	return results
	#render json: results.code
end

def putHash(id) ###########Review
	results = HTTParty.put("http://192.168.99.102:3003/hashdocuments" + id.to_s)
	return results
	#render json: results.code
end

def deleteHash(id)
	results = HTTParty.delete("http://192.168.99.102:3003/hashdocuments" + id.to_s)
	return results
	#render json: results.code
end

