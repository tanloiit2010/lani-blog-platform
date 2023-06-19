defmodule LaniBlogWeb.APIAuthPlug do
  use Pow.Plug.Base

  alias Plug.Conn
  alias Pow.{Config, Plug, Store.CredentialsCache}
  alias PowPersistentSession.Store.PersistentSessionCache

  def fetch(conn, config) do
    with {:ok, signed_token} <- fetch_access_token(conn),
         {:ok, token} <- verify_token(conn, signed_token, config),
         {user, _metadata} <- CredentialsCache.get(store_config(config), token) do
      {conn, user}
    else
      _any -> {conn, nil}
    end
  end

  def create(conn, user, config) do
    IO.puts "user"
    IO.inspect user

    store_config = store_config(config)
    access_token = Pow.UUID.generate()
    renewal_token = Pow.UUID.generate()
    expriration = :timer.minutes(30)
    expired_at = DateTime.utc_now() |> DateTime.add(expriration, :millisecond)

    conn =
      conn
      |> Conn.put_private(:api_access_token, sign_token(conn, access_token, config))
      |> Conn.put_private(:api_renewal_token, sign_token(conn, renewal_token, config))
      |> Conn.put_private(:api_access_token_expired_at, expired_at)
      |> Conn.put_private(:current_user, user)
      |> Conn.register_before_send(fn conn ->
        # The store caches will use their default `:ttl` setting. To change the
        # `:ttl`, `Keyword.put(store_config, :ttl, :timer.minutes(10))` can be
        # passed in as the first argument instead of `store_config`.
        CredentialsCache.put(Keyword.put(store_config, :ttl, expriration), access_token, {user, [renewal_token: renewal_token]})

        PersistentSessionCache.put(
          store_config,
          renewal_token,
          {user, [access_token: access_token]}
        )

        conn
      end)

    {conn, user}
  end

  def delete(conn, config) do
    store_config = store_config(config)

    with {:ok, signed_token} <- fetch_access_token(conn),
         {:ok, token} <- verify_token(conn, signed_token, config),
         {_user, metadata} <- CredentialsCache.get(store_config, token) do
      Conn.register_before_send(conn, fn conn ->
        PersistentSessionCache.delete(store_config, metadata[:renewal_token])
        CredentialsCache.delete(store_config, token)

        conn
      end)
    else
      _any -> conn
    end
  end

  def renew(conn, config) do
    store_config = store_config(config)

    with {:ok, signed_token} <- fetch_access_token(conn),
         {:ok, token}        <- verify_token(conn, signed_token, config),
         {user, metadata}    <- PersistentSessionCache.get(store_config, token) do

      {conn, user} = create(conn, user, config)

      conn =
        Conn.register_before_send(conn, fn conn ->
          CredentialsCache.delete(store_config, metadata[:access_token])
          PersistentSessionCache.delete(store_config, token)

          conn
        end)

      {conn, user}
    else
      _any -> {conn, nil}
    end
  end

  defp sign_token(conn, token, config) do
    Plug.sign_token(conn, signing_salt(), token, config)
  end

  defp signing_salt(), do: Atom.to_string(__MODULE__)

  defp fetch_access_token(conn) do
    case Conn.get_req_header(conn, "authorization") do
      [token | _rest] -> {:ok, token}
      _any            -> :error
    end
  end

  defp verify_token(conn, token, config),
    do: Plug.verify_token(conn, signing_salt(), token, config)

  defp store_config(config) do
    backend = Config.get(config, :cache_store_backend, Pow.Store.Backend.EtsCache)

    [backend: backend, pow_config: config]
  end
end
