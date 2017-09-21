class Hashdocument < ApplicationRecord
  validates :path, uniqueness: true
  validates :path, presence: true
end
