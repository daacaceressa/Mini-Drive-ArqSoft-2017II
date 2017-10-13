class ApplicationController < ActionController::API

  include ActionController::Helpers

  helper_method :isOwner, :authenticate

  @@emailid = ""

  def isOwner
    currentFile = params[:file_id]
    results = HTTParty.get("http://192.168.99.102:3003/hashdocuments/getOwner/" + currentFile.to_s)
    if results.code != 200 || @@emailid != results["owner"]
      render status: 401
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
    results = HTTParty.get("http://192.168.99.102:3000/users/validate_token", options)
    if results.code == 202
      @@emailid = results['email']
    else
      render status: 401
    end
  end

end
