// Generated by CoffeeScript 1.6.2
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Client.Renderer = (function() {
    function Renderer(canvas, game) {
      this.draw = __bind(this.draw, this);      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.game = game;
      setInterval(this.draw, 15);
      this;
    }

    Renderer.prototype.draw = function() {
      var id, player, _ref;

      this.ctx.fillStyle = "rgb(0, 0, 0)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      _ref = this.game.players;
      for (id in _ref) {
        player = _ref[id];
        this.drawObject("Player", player);
      }
      return this;
    };

    Renderer.prototype.drawObject = function(type, obj) {
      var i, tp, _i, _ref;

      if (type === "Player") {
        this.ctx.fillStyle = obj.color;
        this.ctx.fillRect(obj.x - (obj.width / 2.0), obj.y - (obj.height / 2.0), obj.width, obj.height);
        this.ctx.beginPath();
        tp = obj.turnPoints[0];
        this.ctx.moveTo(tp[0], tp[1]);
        for (i = _i = 1, _ref = obj.turnPoints.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
          tp = obj.turnPoints[i];
          this.ctx.lineTo(tp[0], tp[1]);
        }
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.strokeStyle = obj.color;
        this.ctx.stroke();
      }
      return obj;
    };

    return Renderer;

  })();

}).call(this);
