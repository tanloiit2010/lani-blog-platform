defmodule LaniBlogWeb.UserView do
  use LaniBlogWeb, :view

  def render("show.json", %{user: user}) do
    %{
      data: render_one(user, __MODULE__, "user.json")
    }
  end

  def render("user.json", %{user: user}) do
    %{
      email: user.email
    }
  end
end
