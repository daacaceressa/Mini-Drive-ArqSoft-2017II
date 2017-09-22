class FilesController < ApplicationController

	def new
	end
	
	Ruta_directorio_archivos = "public/files/";
	$emailid = ""
	#before_action :validate


	#userid = email retonardo del validate  results [:email]
	def downloadFile
		options = {
			:body => {
				:path => $emailid
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.get("http://192.168.99.102:8009/downloadFile/" + email.to_s, options)
		render json: results

	end

	def listOfFiles
		options = {
			:body => {
				:id => $emailid
			}.to_json,
			:headers => {
				'Content-Type' => 'application/json'
			}
		}	
		results = HTTParty.get("http://192.168.99.102:8009/listOfFiles/" + email.to_s, options)
		render json: results
	end


	def uploadProof
		pic = params[:file]
		time_footprint = Time.now.to_i.to_formatted_s(:number)
#abort uploaded_pics.inspect
#		uploaded_pics.each do |index,pic|
			File.open(Rails.root.join('public', 'uploads', pic.original_filename), 'wb') do |file|
				file.write(pic.read)
				File.rename(file, 'public/uploads/' + time_footprint + pic.original_filename)
			end
#		end
		files_list = Dir['public/uploads/*'].to_json
		render json: { message: 'You have successfully uploded your images.', files_list: files_list }
	end

	def uploadFile

		render json: $emailid.to_json
		@formato_erroneo = false;
	   	if request.post?
	      #Archivo subido por el usuario.
	      archivo = params[:archivo];
	      #Nombre original del archivo.
	      nombre = archivo.original_filename;
	      #Directorio donde se va a guardar.
	      directorio = Ruta_directorio_archivos;
	      #Extensión del archivo.
	      extension = nombre.slice(nombre.rindex("."), nombre.length).downcase;
	      #Verifica que el archivo tenga una extensión correcta.
	      	if extension == ".pdf" or extension == ".doc" or extension == ".docx"
		        #Ruta del archivo.
		        path = File.join(directorio, nombre);
		        #Crear en el archivo en el directorio. Guardamos el resultado en una variable, será true si el archivo se ha guardado correctamente.
		        resultado = File.open(path, "wb") { |f| f.write(archivo.read) };
		        #Verifica si el archivo se subió correctamente.
		        if resultado
		           subir_archivo = "ok";
		        else
		           subir_archivo = "error";
		        end
		        #Redirige al controlador "archivos", a la acción "lista_archivos" y con la variable de tipo GET "subir_archivos" con el valor "ok" si se subió el archivo y "error" si no se pudo.
		        
	      	else
	         	@formato_erroneo = true;
	      	end
	    end

	    #sendFile(nombre)
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

  	def sendFile(nombre)

		
		request = RestClient::Request.new(
          :method => :post,
          :url => "http://192.168.99.102:8009/uploadFile/" + $emailid,
          #:user => email,
          :payload => {
            :multipart => true,
            :file => File.new("/public/files/" + nombre.to_s, 'rb')
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


