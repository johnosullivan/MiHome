defmodule ServerElixirWeb.NodeChannel do
  use ServerElixirWeb, :channel

  def join("node:" <> device_id, payload, socket) do
    IO.puts("device_id")
    IO.puts(device_id)
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
