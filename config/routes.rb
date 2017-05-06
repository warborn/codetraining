Rails.application.routes.draw do
  post 'run', to: 'runner#run'

  resources :challenges
  get 'challenges/:id/train/:language', to: 'challenges#train', as: 'train_challenge'
  get 'challenges/:id/solutions/:language', to: 'challenges#solutions', as: 'solutions_challenge'
  get 'challenges/:id/edit/:language', to: 'challenges#edit'
  patch 'challenges/:id/edit/:language', to: 'challenges#update'

  get 'challenges/example/:language', to: 'examples#show'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
