defmodule ServerElixir.MixProject do
  use Mix.Project

  def project do
    [
      app: :server_elixir,
      version: "0.1.0",
      elixir: "~> 1.12",
      start_permanent: Mix.env() == :dev,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {ServerElixir.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:phoenix, "~> 1.5.7"},
      {:jason, "~> 1.0"},
      {:plug_cowboy, "~> 2.0"},
      {:bcrypt_elixir, "~> 2.0"},
      {:poison, "~> 5.0"},
      {:ecto_sql, "~> 3.4"},
      {:postgrex, ">= 0.0.0"},
      {:elixir_uuid, "~> 1.2"},
      {:guardian, "~> 1.0"},
      {:nimble_totp, "~> 0.1.0"},
      {:eqrcode, "~> 0.1.8"},
      {:phoenix_html, "~> 3.0"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  # defp aliases do
  #  [
  #    "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
  #    # "ecto.reset": ["ecto.drop", "ecto.setup"]
  #    # "test": ["ecto.create --quiet", "ecto.migrate", "test"]
  #  ]
  # end
end
