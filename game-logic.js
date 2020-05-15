function begin() {
  var court = document.getElementById("court");
  var context = court.getContext("2d");

  var colour = "#FFFFFFFF";
  context.strokeStyle = colour;
  context.fillStyle = colour;
  context.lineWidth = 2;

  function Ball() {
    this.radius = 20;
    this.x = court.clientWidth / 2;
    this.y = court.clientHeight / 2;
    this.vel_x = 0;
    this.vel_y = 0;
    this.draw = function() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fill();
    }
  }

  var ball = new Ball();

  function Paddle(x) {
    this.height = court.clientHeight / 4;
    this.width = court.clientWidth / 30;
    this.x = x;
    this.y = court.clientHeight / 2;
    this.draw = function() {
      console.log(this.x);
      context.beginPath();
      context.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
      context.fill();
    }
  }

  var player_paddle = new Paddle(court.clientWidth / 60);
  var opponent_paddle = new Paddle(court.clientWidth * 59 / 60);

  // draw a line
  context.moveTo(0, 0);
  context.lineTo(court.clientWidth, court.clientHeight);
  //context.stroke();

  //draw a ball
  ball.draw();

  //draw the player-paddle
  player_paddle.draw();

  //draw the opponent_paddle
  opponent_paddle.draw();
}

begin();

//debugging
var c = document.getElementById("court");
var ctx = court.getContext("2d");
