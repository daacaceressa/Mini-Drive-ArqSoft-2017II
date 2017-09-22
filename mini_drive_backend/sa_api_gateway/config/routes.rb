Rails.application.routes.draw do
 
	get "user/validate"
	post "user/createUser"
	post "user/loginUser"
	delete "user/logOut"
	post "files/uploadFile"
	post "files/uploadProof"
	get "files/downloadFile"
	get "files/listOfFiles"

end
