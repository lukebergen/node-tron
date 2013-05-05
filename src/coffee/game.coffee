class @Game
  constructor: (initialData = {}) ->
    @ticks = 0
    @keys = initialData.keys || {}
    @players = initialData.players || []
    setInterval(@update, 16.7)
    @

  update: =>
    @ticks++
    for player in @players
      if @keys[player.id][37]
        player.x -= player.speed
      if @keys[player.id][39]
        player.x += player.speed
      if @keys[player.id][38]
        player.y -= player.speed
      if @keys[player.id][40]
        player.y += player.speed

  keyDown: (playerId, keyCode) =>
    @keys[playerId][keyCode] = true

  keyUp: (playerId, keyCode) =>
    if (keyCode == 68)
      console.log("ticks: ", @ticks)
    @keys[playerId][keyCode] = false

  isKeyDown: (playerId, keyCode) =>
    @keys[playerId][keyCode]

  addPlayer: (player) =>
    @players.push(player)
    @keys[player.id] = {}
    player

  dropPlayer: (id) =>
    index = @playerIndex(id)
    if index != -1
      @players.splice(index, 1)
    index

  getPlayer: (id) =>
    index = @playerIndex(id)
    if index == -1
      null
    else
      @players[index]

  playerIndex: (id) =>
    index = @players.findIndex (p) ->
      p.id == id
    index

if (exports?)
  exports.Game = @Game