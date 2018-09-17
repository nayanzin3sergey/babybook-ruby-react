class Post < ApplicationRecord
  validates :body, :author_id, presence: true
  Default = ["youcan.jpg", "hithere.jpg", "cutebaby.jpg"]

  # has_attached_file :image, default_url: "boss-bb.jpg"
  has_attached_file :image, default_url: Default.shuffle.first
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  has_many :comments,
    foreign_key: :post_id,
    class_name: :Comment

end
