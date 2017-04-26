Rails.application.routes.draw do
  root 'challenges#train'
  get 'challenges/new', to: 'challenges#new'
  post 'run', to: 'challenges#run'
  get 'challenge/example/:language', to: 'challenges#example'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
