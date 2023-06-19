defmodule LaniBlog.Blog.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :title, :string
    field :description, :string
    field :content, :string
    field :slug, :string

    belongs_to :user, LaniBlog.Users.User
    belongs_to :category, LaniBlog.Blog.Category

    timestamps()
  end

  def changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :description, :content, :category_id])
    |> validate_required([:title, :content, :category_id])
    |> assoc_constraint(:category)
    |> slugify_title()
  end

  defp slugify_title(changeset) do
    case fetch_change(changeset, :title) do
      {:ok, new_title} -> put_change(changeset, :slug, slugify(new_title))
      :error -> changeset
    end
  end

  defp slugify(str) do
    str
    |> String.downcase()
    |> String.replace(~r/[^\w-]+/u, "-")
  end
end
