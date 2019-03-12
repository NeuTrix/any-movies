Rails.application.routes.draw do
  # resources :movies
  namespace :api do
    post 'user_token' => 'user_token#create'
    
    resources :favourites, only: :destroy
    # only show comment comments route
    resources :comments do
      resources :comments, module: :comments
      # resources :favourites, module: :comments
    end

     # movies routes
    resources :movies do
      # only show movie comments
      resources :comments, module: :movies
      # resources :favourites, module: :movies
    end

    # show users comments and movies
    resources :users do
      resources :comments, module: :users, only: [:index, :show]
      resources :favourites, module: :users
    end
  end

end
