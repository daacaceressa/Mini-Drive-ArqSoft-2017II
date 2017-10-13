Rails.application.routes.draw do
  get "hashdocuments/getByPath", to: "hashdocuments#getByPath"
  resources :hashdocuments
  # Make sure this method works with '/' in the path
  get "hashdocuments/getOwner/:id", to: "hashdocuments#getOwner"
  get "hashdocuments/getOwnFiles/:id", to: "hashdocuments#getOwnFiles", :id => /.*/
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
