class ShareController < ApplicationController

	$emailid = ""
	before_action :validate

	def getShares
		results = HTTParty.get("http://192.168.99.102:3002/shares")
		render json: results
	end

	def postShares
		@Categories_arr = parama[:cat_arr]
		options = {
			:body => {
				:user_id => $emailid,
				:files_id => ["1","2","3"]
				:categories => ["Fisica", "Quimica"] #.....
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.post("http://192.168.99.102:3002/shares", options)
		render json: results

	end

	def sharesById
		results = HTTParty.get("http://192.168.99.102:3002/shares/" + $emailid)
		render json: results
	end

	def delShare
		#@filename = params[:filename]
		@filename = "formato_vida.pdf"
		results = HTTParty.delete("http://192.168.99.102:3002/shares/" + $emailid + "/" + @filename)
		render json: results

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
			$emailid = results['email']
			#render json: $emailid.to_json
		else
			#response.headers['AUTHTOKEN']= ""
			render status: 401
			#redirect_to "http://192.168.99.102:7000/sign_in"
		end
	end

	private


	
end
