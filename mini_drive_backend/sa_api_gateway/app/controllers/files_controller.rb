class FilesController < ApplicationController
	
	Ruta_directorio_archivos = "public/files/";
	$emailid = ""
	$hash = ""
	before_action :validate 


	#userid = email retonardo del validate  results [:email]
	def downloadFile

	#File.open(filename, "w") do |file|
	  #response = HTTParty.get(url, stream_body: true) do |fragment|
	    #print "."
	    #file.write(fragment)

	    #@nameFile= params[:nameFile]
	    @nameFile = "formato_vida.pdf"	
	    File.open(@nameFile, "w") do |file|
		results = HTTParty.get("http://192.168.99.102:8009/downloadFile/" + $emailid.to_s + @nameFile.to_s) do |f|
			file.write(f)
			end
		end
		#render results

	end

	def listOfFiles

		results = HTTParty.get("http://192.168.99.102:8009/listOfFiles/" + $emailid.to_s).parsed_response
		render json: results
	end

	def postHash (nombre)
		path = $email.to_s + "/" + nombre.to_s
		options = {
			:body => {
				:path => path
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}

		}
		results = HTTParty.post("http://192.168.99.102:3003/hashdocuments", options).parsed_response
		render json: results

	end



	def uploadFile

		#render json: $emailid.to_json
		@formato_erroneo = false;
	      #Archivo subido por el usuario.
	    archivo = params[:file]
	      #Nombre original del archivo.	      
	    nombre = archivo.original_filename
	    sendFile(nombre, archivo)
	    archivo = ""

	end

  	def sendFile(name, archivo)
  		#render json: name.to_json
		#results = HTTParty.get("http://192.168.99.102:8009/uploads/" + name.to_s)
		#File.save(results, "public/uploads")
		#render json: results		
		request = RestClient::Request.new(
           :method => :post,
           :url => "http://192.168.99.102:8009/uploadFile/" + $emailid,
           #:user => email,
           :payload => {
             :multipart => true,
             :file => archivo
           })      
		response = request.execute
		#results = HTTParty.post("http://192.168.99.102:8009/uploadFile/"+ userid.to_s, options)

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


