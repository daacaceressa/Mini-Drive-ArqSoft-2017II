class WsCheckUserController < ApplicationController

  soap_service namespace: 'urn:WashOutCheckUser', camelize_wsdl: :lower
  # make case
  soap_action "check",
              :args   => { :email => :string},
              :return => :boolean
  def check

    user = params[:email]
    validate = true
    @state=exist(user)
    if (@state == 200)
      validate = true
    else
      validate = false
    end

    render :soap => validate

  end


  def exist(user)
    options = {
        :body => {
            :email => user
        }.to_json,
        :headers => {
            'Content-Type' => 'application/json'
        }
    }
    results = HTTParty.post(BASE_IP + ":3000/users/exist", options)

    if results.code == 200
      return 200
    else
      return 400
    end
  end


end
