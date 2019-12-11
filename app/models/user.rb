class User < ApplicationRecord

  has_many :cart_items, dependent: :destroy
  has_many :items, through: :cart_items

  has_secure_password

  validates_presence_of :username
  validates_uniqueness_of :username, :case_sensitive => false

end
