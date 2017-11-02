class WsUserCheckController < ApplicationController

  soap_service namespace: 'urn:WashOutCheckUser', camelize_wsdl: :lower
  # make case
  soap_action "check",
              :args   => { :email => :string},
              :return => :boolean
  def check

    userEmail = params[:email]
    validate = true
    @state=exist(userEmail)
    if (@state == 200)
      validate = true
    else
      validate = false
    end

    render :soap => validate

  end


  def exist(userEmail)
    user = User.where(:email => userEmail).first
    if user
      return 200
    else
      return 404
    end
  end

end
