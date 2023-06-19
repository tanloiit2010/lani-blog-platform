defmodule LaniBlog.Repo.Migrations.UpdatePostContentSize do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      modify :content, :string, size: 5000
    end
  end
end
