require 'sinatra'
require 'json'

set :bind, '0.0.0.0'
set :public_folder, File.dirname(__FILE__) + '/public'

post '/like' do
  content_type :json
  {
    success: true,
    user: {
      name: 'Paulo Freire',
      picture: 'pictures/paulo.jpg',
    },
  }.to_json
end

get '/suggestions' do
    content_type :json

    [{
      id: 1,
      images: [{
        src: 'pictures/ernesto.jpg',
        alt: 'Ernesto at the beach',
      }],
      description: {
        name: 'Ernesto Guevara',
        text: 'I\'m a warrior',
      }
    },
    {
      id: 2,
      images: [{
        src: 'pictures/bush.jpg',
        alt: 'George grilling some meat',
      }],
      description: {
        name: 'George Bush',
        text: 'Former US President',
      }
    },
    {
      id: 3,
      images: [{
        src: 'pictures/descartes.jpg',
        alt: 'Rene discarding some trash',
      }],
      description: {
        name: 'Rene Descartes',
        text: 'C\'est moi',
      }
    }].to_json
end
