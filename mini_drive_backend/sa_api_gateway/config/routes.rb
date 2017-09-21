Rails.application.routes.draw do
 
	get "user/validate"
	post "user/createUser"
	post "user/loginUser"
	delete "user/logOut"

end
