require 'rails_helper'
require 'pry'

RSpec.describe 'Challenge management', type: :request do

	describe 'Challenge#create' do
		let(:headers) { headers = { 'CONTENT_TYPE' => 'application/json' } }

		context 'when entering correct data' do
			it 'creates a Challenge' do
				params = { challenge: { name: 'Sort array', description: 'Sort the array', category: 'Fundamentos', rank: 1, tags: 'arrays' } }

				post challenges_path, params: params.to_json , headers: headers
		  	expect(response.content_type).to eq('application/json')
		  	expect(response).to have_http_status(:created)

		  	parsed_response = JSON.parse(response.body)
				expect(parsed_response['name']).to eq('Sort array')
				expect(parsed_response['description']).to eq('Sort the array')
				expect(parsed_response['category']).to eq('Fundamentos')
				expect(parsed_response['rank']).to eq(1)
				expect(parsed_response['tags']).to eq('Arrays')
			end
		end

		context 'when entering invalid data' do
			it 'returns an error' do
				params = { challenge: { name: '', description: '', rank: 1, tags: '' } }
				post challenges_path, params: params.to_json, headers: headers
		  	expect(response).to have_http_status(422)
			end
		end
	end

end