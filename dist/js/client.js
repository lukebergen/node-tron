// Generated by CoffeeScript 1.6.2
(function() {
  this.Client = (function() {
    function Client() {
      var host, socket,
        _this = this;

      host = 'localhost';
      socket = io.connect(host);
      socket.on('init', function(data) {
        var canvas;

        _this.game = new Game(data);
        _this.game.cheat = function() {
          return this.players[0].speed = 4;
        };
        canvas = $("#gameCanvas")[0];
        _this.renderer = new Client.Renderer(canvas, _this.game);
        return socket.emit('playerJoin');
      });
      socket.on('newPlayer', function(player) {
        var newP;

        newP = new Player();
        newP.syncTo(player);
        return _this.game.addPlayer(newP);
      });
      socket.on('playerDrop', function(id) {
        return _this.game.dropPlayer(id);
      });
      socket.on('playerIdentify', function(r) {
        return _this.player = _this.game.getPlayer(r.id);
      });
      socket.on('syncTo', function(game) {
        return _this.game.syncTo(game);
      });
      socket.on('keyDown', function(data) {
        return _this.game.keyDown(data.playerId, data.keyCode);
      });
      socket.on('keyUp', function(data) {
        return _this.game.keyUp(data.playerId, data.keyCode);
      });
      $(window).keydown(function(e) {
        e.preventDefault();
        if (!_this.game.isKeyDown(_this.player.id, e.keyCode)) {
          _this.game.keyDown(_this.player.id, e.keyCode);
          return socket.emit("keyDown", {
            playerId: _this.player.id,
            keyCode: e.keyCode
          });
        }
      });
      $(window).keyup(function(e) {
        e.preventDefault();
        if (_this.game.isKeyDown(_this.player.id, e.keyCode)) {
          _this.game.keyUp(_this.player.id, e.keyCode);
          return socket.emit("keyUp", {
            playerId: _this.player.id,
            keyCode: e.keyCode
          });
        }
      });
    }

    return Client;

  })();

  $(function() {
    return window.client = new Client();
  });

}).call(this);