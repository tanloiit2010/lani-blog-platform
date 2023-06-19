defmodule LaniBlog.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :title, :string
      add :description, :string
      add :content, :string
      add :slug, :string

      timestamps()
    end
  end
end
