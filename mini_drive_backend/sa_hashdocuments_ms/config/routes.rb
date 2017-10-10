Rails.application.routes.draw do
  resources :hashdocuments
  # Make sure this method works with '/' in the path
  # get "hashdocuments/getByPath"
  get "hashdocuments/getOwner/:id", to: "hashdocuments#getOwner"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
