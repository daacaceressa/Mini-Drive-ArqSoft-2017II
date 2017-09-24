class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable, :registerable,
  	:recoverable, :rememberable, :trackable, :validatable

  	$token_lifespan = 1.days

	def ensure_authentication_token
		self.authentication_token_lifespan = Time.now + $token_lifespan
		self.authentication_token ||= generate_authentication_token
	end

	def delete_authentication_token
		self.authentication_token = nil
		self.authentication_token_lifespan = Time.now
	end

	private

	def generate_authentication_token
		if self.authentication_token != nil
			return
		end
		loop do
	  		token = Devise.friendly_token
			break token unless User.where(authentication_token: token).first
		end
	end
end
