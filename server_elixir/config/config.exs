# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# General application configuration
config :server_elixir,
  ecto_repos: [ServerElixir.Repo]

# Core Endpoint for system overall health (cloud compilers)
config :server_elixir, ServerElixir.CoreEndpoint,
  http: [port: System.get_env("CORE_PORT")],
  debug_errors: true

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :server_elixir, ServerElixir.Guardian,
  issuer: "server_elixir",
  secret_key: "BcuibCpINPwJPTRlyQXGBiLczhwl5cy7y408JgpsesV5iFg04OG9Ivqv9XwfZWqp",
  serializer: ServerElixir.GuardianSerializer

# Import environment specific config. This must remain at the bottom of this file so it overrides the configuration defined above.
# export MIX_ENV=dev/prod
import_config "#{Mix.env()}.exs"
