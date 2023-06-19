defmodule LaniBlogWeb.PostView do
  use LaniBlogWeb, :view

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, __MODULE__, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, __MODULE__, "post.json")}
  end

  def render("post.json", %{post: post}) do
    %{
      id: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      slug: post.slug,
      user_id: post.user_id,
      created_at: post.inserted_at,
      created_by: post.user.email,
      category_name: post.category.name,
      category_id: post.category_id
    }
  end
end
