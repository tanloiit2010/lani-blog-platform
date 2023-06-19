defmodule LaniBlogWeb.MyPostController do
  use LaniBlogWeb, :controller
  alias LaniBlog.Blog

  action_fallback LaniBlogWeb.FallbackController

  def index(conn, _params) do
    posts =
      conn
      |> Pow.Plug.current_user()
      |> Blog.list_posts()

    conn
    |> put_view(LaniBlogWeb.PostView)
    |> render("index.json", posts: posts)
  end

  def show(conn, %{"id" => id}) do
    with {:ok, post} <-
           conn
           |> Pow.Plug.current_user()
           |> Blog.get_post(id) do
      conn |> put_view(LaniBlogWeb.PostView) |> render("show.json", post: post)
    end
  end

  def create(conn, %{"data" => post_params}) do
    post =
      conn
      |> Pow.Plug.current_user()
      |> Blog.create_post!(post_params)

    conn
    |> put_view(LaniBlogWeb.PostView)
    |> render("show.json", post: post)
  end

  def update(conn, %{"id" => id, "data" => post_params}) do
    with {:ok, post} <-
           conn
           |> Pow.Plug.current_user()
           |> Blog.get_post(id),
         {:ok, updated_post} <- Blog.update_post(post, post_params) do
      conn
      |> put_view(LaniBlogWeb.PostView)
      |> render("show.json", post: updated_post)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, post} <-
           conn
           |> Pow.Plug.current_user()
           |> Blog.get_post(id),
         {:ok, %Blog.Post{}} <- Blog.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end
end
