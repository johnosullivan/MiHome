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
  ecto_repos: [ServerElixir.Repo],
  totp_key_name: "MiHome Connect"

# Core Endpoint for system overall health (cloud compilers)
config :server_elixir, ServerElixirWeb.CoreEndpoint,
  http: [port: 3000],
  debug_errors: true,
  secret_key_base: "BcuibCpINPwJPTRlyQXGBiLczhwl5cy7y408JgpsesV5iFg04OG9Ivqv9XwfZWqp"

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :server_elixir, ServerElixirWeb.Guardian,
  issuer: "server_elixir",
  secret_key: "BcuibCpINPwJPTRlyQXGBiLczhwl5cy7y408JgpsesV5iFg04OG9Ivqv9XwfZWqp",
  serializer: ServerElixirWeb.GuardianSerializer

# Import environment specific config. This must remain at the bottom of this file so it overrides the configuration defined above.
# export MIX_ENV=dev/prod
import_config "#{Mix.env()}.exs"
