defmodule ServerElixir.ErrorView do
  use ServerElixir, :view

  def render("error.json", %{reason: reason}) do
    %{
      reason: reason
    }
  end
end
