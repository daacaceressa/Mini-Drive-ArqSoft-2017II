Rails.application.routes.draw do
 
	get "user/validate"
	post "user/createUser"
	post "user/loginUser"
	delete "user/logOut"
	post "files/uploadFile"
	post "files/uploadProof"
	get "files/downloadFile"
	get "files/listOfFiles"

	# Categorize Microservice
	get '/showCategories/file/:file_id', to:'categorize#showCategories'
	delete '/categories/file/:file_id', to:'categorize#deleteAllCategories'
	get '/showFiles/category/:category_name', to: 'categorize#getFilesWithCategory'
	post '/addCategories/:file_id', to: 'categorize#addCategories'
	post '/removeCategories/:file_id', to: 'categorize#removeCategories'

end
