defmodule ServerElixirWeb.GuardianErrorHandler do
    @behaviour Guardian.Plug.ErrorHandler
    import Plug.Conn
    
    @impl Guardian.Plug.ErrorHandler
    def auth_error(conn, {type, reason}, opts) do
        send_resp(conn, 401, "{}")
    end
end