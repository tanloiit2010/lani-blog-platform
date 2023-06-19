defmodule LaniBlogWeb.ChangesetView do
  use LaniBlogWeb, :view

  def render("error.json", %{changeset: changeset}) do
    %{
      errors:
        Ecto.Changeset.traverse_errors(changeset, &LaniBlogWeb.ErrorHelpers.translate_error/1)
    }
  end
end
