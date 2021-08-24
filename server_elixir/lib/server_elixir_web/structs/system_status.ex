defmodule ServerElixirWeb.SystemPingResponse do
  @derive [Poison.Encoder]

  defstruct [:status]
end
