object @card

attributes :url, :title, :description

node(:image) { |card| card.image? ? full_asset_url(card.image.url(:original)) : nil }

node(:video) { |card| card.video_type? ? { 'type' => card.video_type, 'url' => card.video_url } : nil }