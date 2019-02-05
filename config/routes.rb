Rails.application.routes.draw do
  # resources :movies
  namespace :api do
    post 'user_token' => 'user_token#create'
    # show users comments and movies
    resources :users do
      resources :comments, module: :users, only: [:index, :show]
      resources :favourites, module: :users
    end
    # movies routes
    resources :movies do
      # only show movie comments
      resources :comments, module: :movies
    end
    # only show comment comments route
    resources :comments do
      resources :comments, module: :comments
    end

    resources :favourites do
    end
  end

end
