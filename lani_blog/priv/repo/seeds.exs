# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     LaniBlog.Repo.insert!(%LaniBlog.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias LaniBlog.Blog

for name <- ~w(Elixir-Phoenix Nextjs Architecture) do
  Blog.create_category!(%{name: name})
end
