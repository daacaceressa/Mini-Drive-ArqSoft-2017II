class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /users/sign_in
  # def new
  #   super
  # end

  # POST /users/sign_in
  def create
    user = User.where(:email => params[:email]).first
    if user && user.valid_password?(params[:password])
      user.ensure_authentication_token
      user.save
      response.headers['X-AUTH-TOKEN'] = user.authentication_token
      render status: 201
      # render :json=> {:auth_token=>user.authentication_token, :email=>user.email}, :status => :ok
    else
      invalid_login_attempt
    end
  end

  # DELETE /users/sign_out
  def destroy
    user = User.find_by_authentication_token(request.headers["X-AUTH-TOKEN"])
    if user != nil
      user.delete_authentication_token
      user.save
      response.headers['X-AUTH-TOKEN'] = ''
      render status: 200
      #render :json=> {:auth_token=>user.authentication_token, :email=>user.email}, :status => :ok
    else
      render status: 400
    end
  end

  def respond_to_on_destroy
  end

  # POST /users/validate_token
  def validate_token
    user = User.find_by_authentication_token(request.headers["X-AUTH-TOKEN"])
    if user != nil
      if user.authentication_token_lifespan > Time.now
        render status: 202
        #render json: user, status: 202
      else 
        user.delete_authentication_token
        user.save
        response.headers['X-AUTH-TOKEN'] = ''
        render status: 403
      end
    else
      render status: 401
    end
  end

  protected

  def invalid_login_attempt
    render json: {:message=>"Error with your login or password"}, status: 401
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
