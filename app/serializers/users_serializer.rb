class UsersSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :cart_items
end
