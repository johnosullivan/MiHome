# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     ServerElixir.Repo.insert!(%ServerElixir.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

ServerElixir.Authentication.create_user(%{email: "john@mihome.io", password: "test_password", first_name: "John", last_name: "Doe", uuid: UUID.uuid4() })
