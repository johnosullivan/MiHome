defmodule ServerElixir.SystemPingResponse do
  @derive [Poison.Encoder]

  defstruct [:status]
end
