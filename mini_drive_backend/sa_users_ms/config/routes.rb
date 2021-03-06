Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }

  devise_scope :user do
    get 'users/validate_token', to: 'users/sessions#validate_token'
    post 'users/exist', to: 'users/registrations#exist'
    wash_out :ws_user_check
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
