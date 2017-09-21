class FilesController < ApplicationController
	
	Ruta_directorio_archivos = "public/files/";
	$email
	before_action :validate 


	#userid = email retonardo del validate  results [:email]
	def upload_file
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

	end

	def delete_file
  		#Recuperamos el nombre del archivo.
	   	archivo_a_borrar = params[:archivo_a_borrar];
	   	#Guardamos la ruta del archivo a eliminar.
	   	ruta_al_archivo = Ruta_directorio_archivos + archivo_a_borrar;
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

  	def send_file(nombre)

		
		request = RestClient::Request.new(
          :method => :post,
          :url => "http://192.168.99.102:8009/uploadFile/" + email,
          #:user => userid,
          :payload => {
            :multipart => true,
            :file => File.new("/public/files/" + nombre.to_s, 'rb')
          })      
		response = request.execute
		#results = HTTParty.post("http://192.168.99.102:8009/uploadFile/"+ userid.to_s, options)

  	end

	private

	def validate
    #llamar al validate de user, con el return de result['email'] si es nil, hacer un render de un error.
    #guardar el email obtenido en la variable global path de logeo
	end

end


