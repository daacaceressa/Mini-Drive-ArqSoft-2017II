class FilesController < ApplicationController
	
	Ruta_directorio_archivos = "public/files/";
	$emailid = ""
	before_action :validate 


	#userid = email retonardo del validate  results [:email]
	def downloadFile
	    @nameFile= params[:nameFile]	
		results = HTTParty.get("http://192.168.99.102:8009/downloadFile/" + emailid.to_s + @nameFile.to_s)
		render json: results

	end

	def listOfFiles
			
		results = HTTParty.get("http://192.168.99.102:8009/listOfFiles/" + $emailid.to_s)
		#return results
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
		results = HTTParty.post("http://192.168.99.102:3003/hashdocuments", options)
		render json: results

	end



	def uploadFile

		#render json: $emailid.to_json
		@formato_erroneo = false;
	      #Archivo subido por el usuario.
	    archivo = params[:file]
	      #Nombre original del archivo.	      
	    nombre = archivo.original_filename

		#File.open(Rails.root.join('public', 'uploads', archivo.original_filename), "wb") do |f| 
		#	f.write(archivo.read)
		#end
		#render json: archivo.path.to_json
		#tmp = params[:my_file_field].tempfile

		#destiny_file = File.join('public', 'uploads', nombre)
		#FileUtils.move archivo.path, destiny_file

		

	    #files_list = Dir['public/uploads/*'].to_json
	    #render json: archivo.to_json
		#render json: { message: 'You have successfully uploded your images.', files_list: files_list } 
	    
		#postHash(nombre)
	    sendFile(nombre, archivo)
	    #deleteFile(nombre)

	end

	def deleteFile(nombre)
  		#Recuperamos el nombre del archivo.
	   	#archivo_a_borrar = params[:archivo_a_borrar];
	   	#Guardamos la ruta del archivo a eliminar.
	   	#ruta_al_archivo = Ruta_directorio_archivos + archivo_a_borrar;
	   	ruta_al_archivo = Ruta_directorio_archivos + nombre;
	   	#Verificamos que el archivo exista para eliminarlo.
	   	if File.exist?(ruta_al_archivo)
	      	#Si el archivo existe se intentará eliminarlo. Dentro de la variable resultado se guardará true si se pudo eliminar y false si no.
	    	  resultado = File.delete(ruta_al_archivo);
	   	else
	      	#El archivo no existe así que no se pudo eliminar nada.
	    	  resultado = false;
	   	end
	   	#Verifica si el archivo se eliminó correctamente.
	   	if resultado
	    	  eliminar_archivo = "ok";
	   	else
	    	  eliminar_archivo = "error";
	   	end
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

	#def validate
    #llamar al validate de user, con el return de result['email'] si es nil, hacer un render de un error.
    #guardar el email obtenido en la variable global path de logeo
	#end

end


