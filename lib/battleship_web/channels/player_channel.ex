# attributes some code to Phoenix chat example repo
defmodule BattleshipWeb.PlayerChannel do
  use BattleshipWeb, :channel

  def join("player:" <> name, _payload, socket) do
    if authorized?(socket, name) do
      # game = Game.new()
      socket = socket
      # |> assign(:game, game)
      |> assign(:name, name)
      # {:ok, Game.client_view(game), socket}
      {:ok, socket}

    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (player:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  def handle_in("new:msg", msg, socket) do
    broadcast! socket, "new:msg", %{user: msg["user"], body: msg["body"]}
    {:reply, {:ok, %{msg: msg["body"]}}, assign(socket, :user, msg["user"])}
  end

  # Add authorization logic here as required.
  defp authorized?(socket, name) do
    socket.assigns[:username] == name
  end
end
