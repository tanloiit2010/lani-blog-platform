defmodule LaniBlogWeb.Router do
  use LaniBlogWeb, :router
  use Pow.Phoenix.Router

  pipeline :api_protected do
    plug Pow.Plug.RequireAuthenticated, error_handler: LaniBlogWeb.APIAuthErrorHandler
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug LaniBlogWeb.APIAuthPlug, otp_app: :lani_blog
  end

  scope "/api", LaniBlogWeb do
    pipe_through [:api, :api_protected]

    resources "/account/posts", MyPostController, only: [:index, :show, :create, :update, :delete]
  end

  scope "/api", LaniBlogWeb do
    pipe_through :api

    resources "/registration", RegistrationController, singleton: true, only: [:create]
    resources "/session", SessionController, singleton: true, only: [:create, :delete]
    post "/session/renew", SessionController, :renew

    resources "/categories", CategoryController, only: [:index]
    resources "/posts", PostController, only: [:index, :show]
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: LaniBlogWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
