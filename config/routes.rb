Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register' }

  root 'pages#index'

  post 'run', to: 'runner#run'

  resources :challenges
  get 'challenges/:id/train/:language', to: 'translations#train', as: 'train_challenge'
  get 'challenges/:id/solutions/:language', to: 'translations#solutions', as: 'solutions_challenge'
  get 'challenges/:id/show/:language', to: 'translations#show'

  get 'challenges/:id/edit/:language', to: 'challenges#edit', as: 'edit_challenge_translation'
  patch 'challenges/:id/edit/:language', to: 'challenges#update'
  delete 'challenges/:id/edit/:language', to: 'challenges#destroy'

  get 'challenges/example/:language', to: 'examples#show'

  get 'users/:id/solutions', to: 'users#solutions', as: 'user_solutions'
  get 'users/:id/challenges', to: 'users#challenges', as: 'user_challenges'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
