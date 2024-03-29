defmodule ServerElixirWeb do
  @moduledoc """
  Documentation for `ServerElixir`.
  """

  def controller do
    quote do
      use Phoenix.Controller, namespace: ServerElixir

      import Plug.Conn
    end
  end

  def json do
    quote do
      def pretty_json(conn, code, data) do
        conn
        |> put_resp_header("content-type", "application/json; charset=utf-8")
        |> send_resp(code, Poison.encode!(data, pretty: true))
      end
    end
  end

  def router do
    quote do
      use Phoenix.Router

      import Plug.Conn
      import Phoenix.Controller
    end
  end

  def view do
    quote do
      use Phoenix.View,
        root: "lib/server_elixir_web/templates",
        namespace: ServerElixir

      import Phoenix.Controller, only: [get_flash: 2, view_module: 1]
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/json/route/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
