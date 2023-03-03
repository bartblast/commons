defmodule Commons.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      CommonsWeb.Telemetry,
      # Start the Ecto repository
      Commons.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Commons.PubSub},
      # Start Finch
      {Finch, name: Commons.Finch},
      # Start the Endpoint (http/https)
      CommonsWeb.Endpoint
      # Start a worker by calling: Commons.Worker.start_link(arg)
      # {Commons.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Commons.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    CommonsWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
