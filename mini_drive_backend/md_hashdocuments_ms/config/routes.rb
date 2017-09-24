Rails.application.routes.draw do
  get 'hashdocuments/getByPath' => 'hashdocuments#show_by_path'
  resources :hashdocuments
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
