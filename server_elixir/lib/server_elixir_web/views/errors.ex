defmodule ServerElixirWeb.ErrorView do
  use ServerElixirWeb, :view

  def render("error.json", %{reason: reason}) do
    %{
      reason: reason
    }
  end
end
