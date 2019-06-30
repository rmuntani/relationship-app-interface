require 'sinatra'
require 'json'

set :bind, '0.0.0.0'
set :public_folder, File.dirname(__FILE__) + '/public'

post '/like' do
  content_type :json
  {
    success: true,
    user: {
      age: 75,
      name: 'Paulo Freire',
      image: {
        alt: 'Paulo Freire',
        src: 'pictures/paulo.jpg',
      }
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
      },
    {
      src: 'pictures/ernesto2.jpg',
      alt: 'Ernestinho',
    }],
      description: {
        age: 39,
        name: 'Ernesto Guevara',
        text: 'Ernesto "Che" Guevara (/ˌtʃeɪ ɡəˈvɑːrə/, ' +
              'Spanish: [eɾˈnesto ˈtʃe ɣeˈβaɾa]; June 14, 1928 – ' +
              'October 9, 1967) was an Argentine Marxist revolutionary,' +
              ' physician, author, guerrilla leader, diplomat and military' +
              ' theorist. A major figure of the Cuban Revolution, his stylized ' +
              'visage has become a ubiquitous countercultural symbol of rebellion' +
              ' and global insignia in popular culture.[6]. As a young medical ' +
              'student, Guevara traveled throughout South America and was ' +
              'radicalized by the poverty, hunger and disease he witnessed. ' +
              'His burgeoning desire to help overturn what he saw as the capitalist' +
              ' exploitation of Latin America by the United States prompted his ' +
              ' involvement in Guatemala. Following the Cuban Revolution, Guevara ' +
              'performed a number of key roles in the new government. These included '+
              ' reviewing the appeals and firing squads for those convicted as war ' +
              'criminals during the revolutionary tribunals, instituting agrarian ' +
              'land reform as minister of industries, helping spearhead a successful ' +
              ' nationwide literacy campaign, serving as both national bank president ' +
              'and instructional director for Cubas armed forces, and traversing the ' +
              'globe as a diplomat on behalf of Cuban socialism. Such positions also ' +
              'allowed him to play a central role in training the militia forces who ' +
              'repelled the Bay of Pigs Invasion, and bringing Soviet nuclear-armed ' +
              'ballistic missiles to Cuba, which precipitated the 1962 Cuban Missile ' +
              'Crisis. Additionally, Guevara was a prolific writer and diarist, composing '+
              ' a seminal manual on guerrilla warfare, along with a best-selling memoir ' +
              'about his youthful continental motorcycle journey. His experiences and ' +
              'studying of Marxism–Leninism led him to posit that the Third Worlds ' +
              'underdevelopment and dependence was an intrinsic result of imperialism, ' +
              'neocolonialism and monopoly capitalism, with the only remedy being ' +
              'proletarian internationalism and world revolution. Guevara left Cuba in ' +
              '1965 to foment revolution abroad, first unsuccessfully in Congo-Kinshasa ' +
              'and later in Bolivia, where he was captured by CIA-assisted Bolivian forces' +
              ' and summarily executed.',

      }
    },
    {
      id: 2,
      images: [{
        src: 'pictures/bush.jpg',
        alt: 'George grilling some meat',
      }],
      description: {
        age: 72,
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
        age: 53,
        name: 'Rene Descartes',
        text: 'C\'est moi',
      }
    }].to_json
end

get '/*' do
  redirect to '/index.html'
end
