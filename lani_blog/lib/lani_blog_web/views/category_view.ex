defmodule LaniBlogWeb.CategoryView do
  use LaniBlogWeb, :view

  def render("index.json", %{categories: categories}) do
    %{data: render_many(categories, __MODULE__, "category.json")}
  end

  def render("category.json", %{category: category}) do
    %{
      id: category.id,
      name: category.name
    }
  end
end
