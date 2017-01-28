class Stock
  include Mongoid::Document
  field :date, type: String
  field :data, type: Hash
end
