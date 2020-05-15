function begin() {
  var court = document.getElementById("court");
  var context = court.getContext("2d");

  var ball = {
    radius: 20,
    x: 0,
    y: 0,
    vel_x: 0,
    vel_y: 0,
    draw: function() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fill();
    }
  }

  var colour = "#FFFFFFFF";
  context.strokeStyle = colour;
  context.fillStyle = colour;
  context.lineWidth = 2;

  // draw a line
  context.moveTo(0, 0);
  context.lineTo(court.clientWidth, court.clientHeight);
  context.stroke();

  //draw a ball
  ball.draw();
}

begin();

//debugging
var c = document.getElementById("court");
var ctx = court.getContext("2d");
