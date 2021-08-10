defmodule ServerElixir do
  @moduledoc """
  Documentation for `ServerElixir`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> ServerElixir.hello()
      :world

  """
  def hello do
    :world
  end

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

  @doc """
  When used, dispatch to the appropriate controller/json/route/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
