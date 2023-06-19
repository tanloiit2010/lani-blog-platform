defmodule LaniBlog.Blog do
  alias LaniBlog.Repo
  alias LaniBlog.Blog.Post
  alias LaniBlog.Blog.Category
  alias LaniBlog.Users.User

  import Ecto.Query

  def list_posts(%User{id: user_id}) do
    Repo.all(from p in Post, where: p.user_id == ^user_id, preload: [:category, :user], order_by: [desc: :inserted_at])
  end

  def list_posts(category_id) do
    Repo.all(from p in Post, where: p.category_id == ^category_id, preload: [:category, :user], order_by: [desc: :inserted_at])
  end

  def list_posts do
    Repo.all(from p in Post, preload: [:category, :user], order_by: [desc: :inserted_at])
  end

  def get_post(id) do
    q = from p in Post, preload: [:category, :user]
    case Repo.get(q, id) do
      nil -> {:error, :not_found}
      post -> {:ok, post}
    end
  end

  def get_post(%User{id: user_id}, id) do
    q = from p in Post, where: p.user_id == ^user_id, preload: [:category, :user]
    case Repo.get(q, id) do
      nil -> {:error, :not_found}
      post -> {:ok, post}
    end
  end

  def create_post!(%User{} = user, attrs \\ %{}) do
    %Post{}
    |> Post.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:user, user)
    |> Repo.insert!()
    |> Repo.preload([:category, :user])
  end

  def update_post(%Post{} = post, attrs) do
    post
    |> Post.changeset(attrs)
    |> Repo.update()
  end

  def delete_post(%Post{} = post) do
    Repo.delete(post)
  end

  def create_category!(attrs \\ %{}) do
    %Category{}
    |> Category.changeset(attrs)
    |> Repo.insert!()
  end

  def list_alphabetical_categories do
    Category
    |> Category.alphabetical()
    |> Repo.all()
  end
end
