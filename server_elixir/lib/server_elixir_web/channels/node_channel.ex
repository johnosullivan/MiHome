defmodule ServerElixirWeb.Channels.NodeChannel do
  use ServerElixirWeb, :channel

  def join("node:" <> hub_id, payload, socket) do
    :ok = ChannelWatcher.monitor(:rooms, self(), {__MODULE__, :leave, [hub_id]})


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

  def leave(id) do
    IO.puts("leave")
    IO.puts(id)
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
