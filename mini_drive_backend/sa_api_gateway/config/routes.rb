Rails.application.routes.draw do
 
	# Users Microservice
	
	get "user/validate"
	post "user/createUser"
	post "user/loginUser"
	delete "user/logOut"
	
	# Upload Microservice

	post "files/uploadFile", to: 'files#uploadFile'
	get "files/downloadFile/:filename", to: 'files#downloadFile'
	get "files/listOfFiles", to: 'files#listOfFiles'
	get "files/delFile/:filename", to: 'files#delFile'

	# Categorize Microservice

	get '/showCategories/file/:file_id', to:'categorize#showCategories'
	delete '/categories/file/:file_id', to:'categorize#deleteAllCategories'
	get '/showFiles/category/:category_name', to: 'categorize#getFilesWithCategory'
	post '/addCategories/:file_id', to: 'categorize#addCategories'
	post '/removeCategories/:file_id', to: 'categorize#removeCategories'
 
	# Share Microservice

	get "share/getMyShares"
	post "share/postShares"
	delete "share/deleteShare/:user_id/:file_id", to: "share#deleteShare"

	# Hash Microservice

	get "hash/getHash"
	post "hash/postHash"
	get "hash/getHashId/:hash", to: "hash#getHashId"
	get "hash/deleteHash/:hash", to: "hash#deleteHash"
	put "hash/putHash/:hash", to: "hash#putHash"
	get "hash/getHashByPath/:fileName", to: "hash#getHashByPath"

end
