Rails.application.routes.draw do

  concern :commentable do
    resoureces :comments
  end
  resources :comments, conerns: :commentable
  resources :movies, conerns: :commentable
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
