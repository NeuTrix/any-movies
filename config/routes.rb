Rails.application.routes.draw do
  # resources :movies
  namespace :api do
    post 'user_token' => 'user_token#create'
    # show users comments and movies
    resources :users do
      resources :comments, module: :users, only: [:index, :show]
    end
    # movies routes
    resources :movies do
      # only show movie comments
      resources :comments, module: :movies
    end
    # only show comment comments route
    resources :comments, only: [:index, :show, :destroy] do
      resources :comments, module: :comments
    end
  end

end
