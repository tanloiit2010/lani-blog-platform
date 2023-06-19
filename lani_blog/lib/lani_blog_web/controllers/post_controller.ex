defmodule LaniBlogWeb.PostController do
  use LaniBlogWeb, :controller
  alias LaniBlog.Blog

  action_fallback LaniBlogWeb.FallbackController

  def index(conn, %{"category_id" => category_id}) do
    posts = Blog.list_posts(category_id)
    render(conn, "index.json", posts: posts)
  end

  def index(conn, _params) do
    posts = Blog.list_posts()
    render(conn, "index.json", posts: posts)
  end

  def show(conn, %{"id" => id}) do
    with {:ok, post} <- Blog.get_post(id) do
      render(conn, "show.json", post: post)
    end
  end
end
