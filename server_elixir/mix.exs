defmodule ServerElixir.MixProject do
  use Mix.Project

  def project do
    [
      app: :server_elixir,
      version: "0.1.0",
      elixir: "~> 1.12",
      start_permanent: Mix.env() == :prod,
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
      {:guardian, "~> 1.0"}
    ]
  end
end
