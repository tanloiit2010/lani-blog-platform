defmodule LaniBlogWeb.CategoryController do
  use LaniBlogWeb, :controller
  alias LaniBlog.Blog

  def index(conn, _params) do
    categories = Blog.list_alphabetical_categories

    render(conn, "index.json", categories: categories)
  end
end
