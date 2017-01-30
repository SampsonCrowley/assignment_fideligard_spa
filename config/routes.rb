Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'angular#index'
  resources :stocks, only:[:index, :show]

  match "*path", to: "angular#index", via: :all
end
