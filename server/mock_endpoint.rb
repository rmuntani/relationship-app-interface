require 'sinatra'
require 'json'

set :bind, '0.0.0.0'
set :public_folder, File.dirname(__FILE__) + '/public'

get '/suggestions' do
    content_type :json

    [{
      id: 1,
      images: [{
        src: 'ernesto.jpg',
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
        src: 'bush.jpg',
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
        src: 'descartes.jpg',
        alt: 'Rene discarding some trash',
      }],
      description: {
        name: 'Rene Descartes',
        text: 'C\'est moi',
      }
    }].to_json
end
