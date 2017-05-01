
var self = this;
self.options = {};
self.options.snakeColour = 'rgba(0, 0, 200, 0.5)';
self.options.initialSnakeLength = 5;
self.options.snakeSize = 20;

self.direction = "STOP";

document.onkeydown = function (e) {
    e = e || window.event;
    var key = e.keyCode;

    if (key === 37 && self.direction !== "RIGHT"){
         self.direction = "LEFT";
    }
    else if (key == 38 && self.direction !== "DOWN") {
            self.direction = "UP";
    }
    else if (key === 39 && self.direction !== "LEFT") {
        self.direction = "RIGHT";       
    }
    else if (key === 40 && self.direction !== "UP") {
         self.direction = "DOWN";
    }
    // use e.keyCode

};

function Segment(x, y) {
    return {
        x: x,
        y: y
    };
};

var snake = {};
snake.segments = [];
var startPos = { x: 200, y: 200 };
for (var i = 0; i < self.options.initialSnakeLength; i++) {
    snake.segments.push(new Segment(startPos.x, startPos.y));
    startPos.x = startPos.x - self.options.snakeSize;
}

function paintBackground() {

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 7;
    context.strokeStyle = 'black';
    context.strokeRect(0,0,canvas.width, canvas.height);
}

function GetRandomNumberBetween(lo, hi) {
  return Math.floor(lo + Math.random() * (hi - lo));
}
Number.prototype.FindClosestNumberThatIsDivisibleBy = function(n) {
  return Math.round(this / n) * n; //simplify as per Guffa
};

function createSnakeFood() {
    var randomY = GetRandomNumberBetween(0,self.canvas.height);
    var randomX = GetRandomNumberBetween(0,self.canvas.width);
    var snakeFood = new Segment(randomX.FindClosestNumberThatIsDivisibleBy(self.options.snakeSize),randomY.FindClosestNumberThatIsDivisibleBy(self.options.snakeSize));
    console.log("snakeFood",snakeFood);
    return snakeFood;
}

function drawSegment(segment) {

        context.beginPath();
        context.rect(segment.x, segment.y, self.options.snakeSize, self.options.snakeSize);
        context.fillStyle = self.options.snakeColour;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'white';
        context.stroke();
}

function drawSnake(x, y) {

    _.each(snake.segments, function (segment) {
        drawSegment(segment);
    });

}

function init() {
    var snakeFood = createSnakeFood();
    var canvas = CanvasService.getCanvas('canvas');
    self.context = canvas.context;
    setInterval(function () {

        paintBackground();
        var head = self.snake.segments[0];
       
        var dr = self.direction;
        if (dr !== "STOP") {
        var lastSegment = self.snake.segments.pop();

        lastSegment.x = head.x;
        lastSegment.y = head.y;

        if (dr === "LEFT" && dr !== "RIGHT") {
            lastSegment.x = head.x - self.options.snakeSize;
        }
        else if (dr === "RIGHT" && dr !== "LEFT") {
            lastSegment.x = head.x + self.options.snakeSize;
        }
        else if (dr === "UP" && dr !== "DOWN") {
             lastSegment.y = head.y - self.options.snakeSize;
        }
        else if  (dr === "DOWN" && dr !== "UP") {
             lastSegment.y = head.y + self.options.snakeSize;
        }

        self.snake.segments.unshift(lastSegment);
        head = self.snake.segments[0];
        if (head.x === self.canvas.width) {
            head.x = 0;
        }
        else if (head.y === 0) {
            head.y = self.canvas.height;
        }
        else if (head.x === 0) {
            head.x = self.canvas.width;
        }
        else if (head.y === self.canvas.height) {
            head.y = 0;
        }
        }
        drawSnake();
        drawSegment(snakeFood);
    
    }, 60);

}
document.addEventListener("DOMContentLoaded", init);