class FilesController < ApplicationController
	
	# THE DIFFERENCE BETWEEN @@ and $ is the scope. @@ only works inside this class. $ is global (AVOID).

	@@file_directory = "/tmp/";
	@@emailid = ""
	before_action :authenticate 
	before_action :isOwner, only: [:delFile]

	def downloadFile
		#TODO: Ask Leo how to get the file extension.
		#TODO: Manage File not found.
		#TODO: Check if the file has been shared with me or I'm owner
		nameFile = params[:filename].to_s + ".pdf"
		#extension = nombre.slice(nombre.rindex("."), nombre.length).downcase;
		#nameFile = "Incapacidad.pdf"
		#@@emailid = "1"
		File.open(@@file_directory + nameFile, "wb") do |f|
			f.write HTTParty.get(BASE_IP + ":3004/downloadFile/" + @@emailid.to_s + "/" + nameFile).parsed_response
		end
		send_file (@@file_directory + nameFile)
	end

	def downloadSharedFile
		email = params[:user_id].to_s
		nameFile = params[:filename].to_s
		File.open(@@file_directory + nameFile, "wb") do |f|
			f.write HTTParty.get(BASE_IP + ":3004/downloadFile/" + email + "/" + nameFile).parsed_response
		end
		send_file (@@file_directory + nameFile)
	end

	def listOfFiles
		#TODO: This method is not working.
		results = HTTParty.get(BASE_IP + ":3004/listOfFiles/" + @@emailid.to_s).parsed_response
		#results = HTTParty.get(BASE_IP + ":8009/listOfFiles/1").parsed_response
		#render json: @@emailid
		render json: results
	end

	def postHash(nameF)
		path = @@emailid.to_s + "/" + nameF.to_s
		#render json: path.to_json
		options = {
			:body => {
				:path => path
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}
		results = HTTParty.post(BASE_IP + ":3003/hashdocuments", options).parsed_response
		render json: results
	end

	def uploadFile
		#TODO: Names in English please.
		#render json: @@emailid.to_json
		@formato_erroneo = false;
		#Archivo subido por el usuario.
		archivo = params[:file]
		#Nombre original del archivo.	      
		nombre = archivo.original_filename
		sendFile(nombre, archivo)
		archivo = ""
	end

	def sendFile(nameF, archivo)
		#TODO: Use postHash function.	
		postHash(nameF)
		request = RestClient::Request.new(
			:method => :post,
			:url => BASE_IP + ":3004/uploadFile/" + @@emailid,
			#:user => email,
			:payload => {
				:multipart => true,
				:file => archivo
			})      
		response = request.execute
		#results = HTTParty.post(BASE_IP + ":8009/uploadFile/"+ userid.to_s, options)
		#TODO: Use the response to send a status to the user.
	end

	def delFile
		nameFile = params[:filename].to_s + ".pdf"
		results = HTTParty.get(BASE_IP + ":3004/deleteFile/" + @@emailid.to_s + "/" + nameFile)
		render json: (@@emailid.to_s + "/" + nameFile).to_json
		#render json: results.code
	end
	
end


