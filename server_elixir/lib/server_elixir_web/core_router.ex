defmodule ServerElixir.CoreRouter do
  use ServerElixir, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/api/v1", ServerElixir do
    pipe_through(:api)

    get("/", Controllers.System, :index)

    # post("/users", UserController, :sign_in)
  end
end
