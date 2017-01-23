class AddVideoToPreviewCards < ActiveRecord::Migration[5.0]
  def change
    add_column :preview_cards, :video_type, :string
    add_column :preview_cards, :video_url, :string
  end
end
