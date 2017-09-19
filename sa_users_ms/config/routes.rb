Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }

  devise_scope :user do
    get 'users/validate_token', to: 'users/sessions#validate_token'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
