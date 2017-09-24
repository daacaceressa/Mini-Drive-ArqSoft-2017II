class HashController < ApplicationController

	@@emailid = ""
	before_action :validate 

	#this method is call in files_controller by sendFile with name postHash(nombre)

	#def postHash
		#@path = params[:path]
		#options = {
			#:body => {
				#:path => $email
			#}.to_json,
			#:headers => {
				#'Content-Type' => 'application/json'
			#}

		#}
		#results = HTTParty.post("http://192.168.99.102:3003/hashdocuments", options)
		#render json: results.code

	#end

	def getHash
		results = HTTParty.get("http://192.168.99.102:3003/hashdocuments").parsed_response
		#return results
		render json: results
	end

	def getHashId
		idHash = params[:hash].to_s
		results = HTTParty.get("http://192.168.99.102:3003/hashdocuments/" + idHash.to_s).parsed_response
		#return results
		render json: results
	end

	def getHashByPath
		fileName = params[:fileName].to_s + ".pdf"
		path = @@emailid + "/" + fileName
		#render json: path.to_json
		results = HTTParty.get("http://192.168.99.102:3003/hashdocuments/getByPath?path=" + path).parsed_response
		#return results
		render json: results
	end

	def putHash
		idHash = params[:hash].to_s
		#@path = params[:path].to_s
		@path = "alan@gmail.com/formato_vida.pdf"
		options = {
			:body => {
				:path => @path
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.put("http://192.168.99.102:3003/hashdocuments/" + idHash.to_s, options).parsed_response
		#return results
		#render json: results
	end

	def deleteHash
		idHash = params[:hash].to_s
		#render json: idHash.to_json
		results = HTTParty.delete("http://192.168.99.102:3003/hashdocuments/" + idHash.to_s).parsed_response
		#return results
		render status: 200
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
		results = HTTParty.get("http://192.168.99.102:3000/users/validate_token", options)
		#render json: results.code
		if results.code == 202
			@@emailid = results['email']
			#render json: $emailid.to_json
		else
			#response.headers['AUTHTOKEN']= ""
			render status: 401
			#redirect_to "http://192.168.99.102:7000/sign_in"
		end
	end

	private
end

