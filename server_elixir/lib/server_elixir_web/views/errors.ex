defmodule ServerElixir.ErrorView do
  use ServerElixir, :view

  def render("unauthorized.json", %{reason: reason}) do
    %{
      reason: reason
    }
  end
end
