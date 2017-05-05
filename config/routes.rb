Rails.application.routes.draw do
  # root 'challenges#index'
  # get 'challenges/train', to: 'challenges#train'
  # get 'challenges/new', to: 'challenges#new'
  post 'run', to: 'challenges#run'

  resources :challenges
  get 'challenges/:id/train/:language', to: 'challenges#train', as: 'train_challenge'
  get 'challenges/:id/solutions/:language', to: 'challenges#solutions', as: 'solutions_challenge'
  get 'challenges/example/:language', to: 'challenges#example'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
