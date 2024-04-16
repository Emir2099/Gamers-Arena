class Snake {
  constructor(x, y, size) {
    this.head = { x: x, y: y };
    this.size = size;
    this.color = "blue";
    this.body = [{ x: x - 1, y: y }];
    this.direction = { x: 1, y: 0 };
    this.willGrow = false;
  }

  setDirection(x, y) {
    this.direction = { x: x, y: y };
  }

  draw() {
    // Draw the head
    this.drawPart(this.head, "darkgreen");
  
    // Draw the body
    Array.from(this.body).forEach((part, index) => {
      let color = index === this.body.length - 1 ? "lightgreen" : "green";
      this.drawPart(part, color);
    });
  }
  
drawPart(part, color) {
  let x = part.x * this.size;
  let y = part.y * this.size;
  let r = this.size / 2;

  // Draw the top semi-circle
  canvasContext.beginPath();
  canvasContext.arc(x + r, y + r, r, -Math.PI, 0);
  canvasContext.fillStyle = color;
  canvasContext.fill();

  // Draw the bottom semi-circle
  canvasContext.beginPath();
  canvasContext.arc(x + r, y + r, r, 0, Math.PI);
  canvasContext.fillStyle = color;
  canvasContext.fill();

  // Draw the rectangle in the middle
  createRect(x, y + r - 2, this.size, 4, color);

  // If it's the head, draw the eyes and tongue
  if (part === this.head) {
    // Draw the eyes
    canvasContext.fillStyle = "white";
    canvasContext.beginPath();
    canvasContext.arc(x + r / 2, y + r / 2, r / 4, 0, 2 * Math.PI);
    canvasContext.fill();
    canvasContext.beginPath();
    canvasContext.arc(x + 3 * r / 2, y + r / 2, r / 4, 0, 2 * Math.PI);
    canvasContext.fill();

    // Draw the tongue
    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    canvasContext.arc(x + r, y + 2 * r, r / 4, 0, Math.PI);
    canvasContext.fill();
  }
}

  inDirection(x, y) {
    return this.direction.x == x && this.direction.y == y;
  }

  move(apple) {
    if (this.willGrow) {
      this.willGrow = false;
    } else {
      this.body.pop();
    }
    this.body.unshift({ x: this.head.x, y: this.head.y });

    this.head.x += this.direction.x;
    this.head.y += this.direction.y;

     // Check if the snake has eaten the apple
  if (this.head.x == apple.pos.x && this.head.y == apple.pos.y) {
    this.willGrow = true;
    apple.changePosition(this.head, this.body, gameOver); // Call changePosition here
    return true;
  }

    this.checkSelfCollision();
    this.checkWall();
  }

  checkSelfCollision() {
    // Self-Collision
    Array.from(this.body).forEach((part) => {
      if (this.head.x == part.x && this.head.y == part.y) {
        gameOver();
      }
    });
  }

  checkWall() {
    if (this.head.x * this.size >= canvas.width) this.head.x = 0;
    if (this.head.y * this.size >= canvas.height) this.head.y = 0;

    if (this.head.x < 0) this.head.x = (canvas.width / this.size) - 1;
    if (this.head.y < 0) this.head.y = (canvas.height / this.size) - 1;
  }
}
