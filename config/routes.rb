Rails.application.routes.draw do
  # resources :movies
  namespace :api do
    post 'user_token' => 'user_token#create'
    # show users comments and movies
    resources :users do
      resources :comments, module: :users
    end
    # movies routes
    resources :movies do
      # only show movie comments
      resources :comments, module: :movies, only: [:index, :show]
    end
    # only show comment comments route
    resources :comments, only: [] do
      resources :comments, module: :comments, only: [:index, :show]
    end
  end

end
