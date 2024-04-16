class Apple {
  constructor(x, y, size) {
    this.pos = { x: x, y: y };
    this.size = size;
    this.image = new Image();
    this.image.src = 'food.svg'; // replace with the actual path to your SVG
  }

  draw() {
    canvasContext.drawImage(
      this.image,
      this.pos.x * this.size,
      this.pos.y * this.size,
      this.size,
      this.size
    );
  }

  changePosition(head, body, gameOver) {
    var positions = [];
    for (var x = 0; x < canvas.width / this.size; x++) {
      for (var y = 0; y < canvas.height / this.size; y++) {
        positions.push({ x: x, y: y });
      }
    }

    positions = positions.filter(pos => {
      if (pos.x == head.x && pos.y == head.y) {
        return false;
      }
      for (var i = 0; i < body.length; i++) {
        if (pos.x == body[i].x && pos.y == body[i].y) {
          return false;
        }
      }
      return true;
    });

    if (positions.length == 0) {
      gameOver();
      return;
    }

    var index = Math.floor(Math.random() * positions.length);
    this.pos = positions[index];
  }
}