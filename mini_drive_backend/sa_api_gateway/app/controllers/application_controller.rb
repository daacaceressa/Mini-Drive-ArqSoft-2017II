class ApplicationController < ActionController::API

  include ActionController::Helpers

  helper_method :isOwner, :authenticate

 # BASE_IP = "http://35.188.6.128";
  BASE_IP = "http://35.202.138.154";
  @@emailid = ""

  def isOwner
    currentFile = params[:file_id]
    results = HTTParty.get(BASE_IP + ":3003/hashdocuments/getOwner/" + currentFile.to_s)
    if results.code != 200 || @@emailid != results["owner"]
      render json: {"status" => 401}, status: 401
    end
  end

  def authenticate
    @token = request.headers['AUTHTOKEN']
    options = {
      :body => {
        :X_AUTH_TOKEN => @token
      }.to_json,
      :headers => {
        'Content-Type' => 'application/json'
      }
    } 
    results = HTTParty.get(BASE_IP + ":3000/users/validate_token", options)
    if results.code == 202
      @@emailid = results['email']
    else
      render json: {"status" => 401}, status: 401
    end
  end

end
