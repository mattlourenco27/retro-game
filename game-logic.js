
var court = document.getElementById("court");
var context = court.getContext("2d");

var colour = "#FFFFFFFF";
context.strokeStyle = colour;
context.fillStyle = colour;
context.lineWidth = 2;

var max_paddle_speed = 5;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function Ball() {
  this.radius = 20;
  this.x = court.width / 2;
  this.y = court.height / 2;
  this.vel_x = 0;
  this.vel_y = 0;
  this.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  },
  //handles collisions with the borders of the court
  this.handleBorders = function() {
    if(this.x >= court.width) {
      score.player += 1;
      this.x = court.width / 2;
      this.y = court.height / 2;

      this.vel_y = getRandomInt(7) - 3;
    } else if(this.x <= 0) {
      score.ai += 1;
      this.x = court.width / 2;
      this.y = court.height / 2;

      this.vel_y = getRandomInt(7) - 3;
    }

    if(this.y + this.radius >= court.height) {
      this.vel_y = -this.vel_y;
      this.y = court.height - this.radius - 1;
    } else if(this.y - this.radius <= 0) {
      this.vel_y = -this.vel_y;
      this.y = this.radius + 1;
    }
  }
}

var ball = new Ball();

function Paddle(x) {
  this.height = court.height / 4;
  this.width = court.width / 30;
  this.x = x;
  this.y = court.height / 2;
  this.vel_y = 0;
  this.top_edge = function() {return this.y - this.height / 2;}
  this.bot_edge = function() {return this.y + this.height / 2;}
  this.l_edge = function() {return this.x - this.width / 2;}
  this.r_edge = function() {return this.x + this.width / 2;}
  this.draw = function() {
    context.beginPath();
    context.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    context.fill();
  },
  //handles collisions with the ball
  this.handleCollision = function() {
    //handle side edge collisions
    if(ball.y >= this.top_edge() && ball.y <= this.bot_edge()) {
      if(ball.x + ball.radius >= this.l_edge() && ball.x + ball.radius <= this.r_edge()) {
        ball.vel_x = -ball.vel_x;
        ball.x = this.x - this.width / 2 - ball.radius - 1;

        // add some concavity to the paddles
        ball.vel_y += 0.05 * (ball.y - this.y)
      }
      if(ball.x - ball.radius >= this.l_edge() && ball.x - ball.radius <= this.r_edge()) {
        ball.vel_x = -ball.vel_x;
        ball.x = this.x + this.width / 2 + ball.radius + 1;

        // add some concavity to the paddles
        ball.vel_y += 0.05 * (ball.y - this.y)
      }
    }
  },

  // moves the paddle
  this.move = function() {
    this.y += this.vel_y;
    if(this.bot_edge() > court.height) this.y = court.height - this.height / 2;
    if(this.top_edge() < 0) this.y = this.height / 2;
  }
}

var player_paddle = new Paddle(court.width / 60);
var opponent_paddle = new Paddle(court.width * 59 / 60);

function handle_player_movement() {
  player_paddle.vel_y = 0.1 * (mouse.y - player_paddle.y);
  if (player_paddle.vel_y > max_paddle_speed) player_paddle.vel_y = max_paddle_speed;
  if (player_paddle.vel_y < -max_paddle_speed) player_paddle.vel_y = -max_paddle_speed;
}

function handle_ai_movement() {
  opponent_paddle.vel_y = 0.1 * (ball.y - opponent_paddle.y);
  if (opponent_paddle.vel_y > max_paddle_speed) opponent_paddle.vel_y = max_paddle_speed;
  if (opponent_paddle.vel_y < -max_paddle_speed) opponent_paddle.vel_y = -max_paddle_speed;
}

var mouse = {
  x: 0,
  y: 0
}

var score = {
  player: 0,
  ai: 0,
  px: court.width / 4,
  py: court.height / 5,
  ax: court.width * 3 / 4,
  ay: court.height / 5
}

court.addEventListener('mousemove', detect_mouse);

ball.vel_x = 5;
ball.vel_y = 0;

// begin the game loop running at 60fps
setInterval(game_loop, 1000 / 60);


function game_loop() {
  context.beginPath();
  context.fillStyle = "#000000FF";
  context.rect(0, 0, court.width, court.height);
  context.fill();
  context.fillStyle = colour;

  // draw the middle line
  context.beginPath();
  context.setLineDash([30, 30]);
  context.moveTo(court.width / 2, 0);
  context.lineTo(court.width / 2, court.height);
  context.stroke();
  context.setLineDash([]);

  //draw the ball
  ball.draw();

  ball.handleBorders();
  opponent_paddle.handleCollision();
  player_paddle.handleCollision();

  ball.x += ball.vel_x;
  ball.y += ball.vel_y;

  //draw the player-paddle
  player_paddle.draw();

  handle_player_movement();
  player_paddle.move();

  //draw the opponent_paddle
  opponent_paddle.draw();

  handle_ai_movement();
  opponent_paddle.move();

  //draw the scores
  context.font = "30px sans-serif";
  context.fillText(score.player, score.px, score.py);
  context.fillText(score.ai, score.ax, score.ay);
}

function detect_mouse(event) {
  var rect = court.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
}
