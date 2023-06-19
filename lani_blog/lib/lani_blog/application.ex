defmodule LaniBlog.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      LaniBlog.Repo,
      # Start the Telemetry supervisor
      LaniBlogWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: LaniBlog.PubSub},
      # Start the Endpoint (http/https)
      LaniBlogWeb.Endpoint,
      Pow.Store.Backend.MnesiaCache
      # Start a worker by calling: LaniBlog.Worker.start_link(arg)
      # {LaniBlog.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: LaniBlog.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    LaniBlogWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
