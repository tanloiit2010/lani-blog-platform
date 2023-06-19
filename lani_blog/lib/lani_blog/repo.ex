defmodule LaniBlog.Repo do
  use Ecto.Repo,
    otp_app: :lani_blog,
    adapter: Ecto.Adapters.MyXQL
end
