# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :server_elixir,
  ecto_repos: [ServerElixir.Repo]

# Configures the endpoint
config :server_elixir, ServerElixirWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "q/N8v/1G9eAbCuJ9f4BJd10ciUdxY91SrOGx4W7czjn7vWuVFUpCl7n1L4/WuLce",
  render_errors: [view: ServerElixirWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: ServerElixir.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
