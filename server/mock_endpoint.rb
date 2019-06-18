require 'sinatra'
require 'json'

set :bind, '0.0.0.0'

get '/suggestions' do
    content_type :json
    {
        test: "yes"    
    }.to_json
end
