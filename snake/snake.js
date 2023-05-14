// 获取画布和上下文
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// // 小方格边长
var gridSize = 10;

// 计时器ID
var timerId = null;

// 蛇的初始状态
var snake = {
	body: [
		{x: 140, y: 140},
		{x: 130, y: 140},
		{x: 120, y: 140},
		{x: 110, y: 140},
		{x: 100, y: 140},
	],
	direction: "right"
};

// 食物的初始位置
var food = {
	x: 0,
	y: 0
};


// 得分
var score = 0;
var scoreEl = document.getElementById("score");

// 生成随机坐标
function randomCoord() {
	return Math.floor(Math.random() * (canvas.width - gridSize) / gridSize) * gridSize;
}


// 生成食物

function generateFood() {
	food.x = randomCoord();
	food.y = randomCoord();
}

// 渲染蛇和食物

function render() {
	// 清空画布
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 绘制蛇
	ctx.fillStyle = "#FFA500";
	snake.body.forEach(function(segment, index) {
		ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
	});

	// 绘制食物
	ctx.fillStyle = "#f00";
	ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// 移动蛇
function moveSnake() {
	// 创建新头部
	var head = {x: snake.body[0].x, y: snake.body[0].y};
	switch (snake.direction) {
		case "up":
			head.y -= gridSize;
			break;
		case "down":
			head.y += gridSize;
			break;
		case "left":
			head.x -= gridSize;
			break;
		case "right":
			head.x += gridSize;						
			break;
	}

	// 判断是否撞墙或自咬
	if (
		head.x < 0 || head.x >= canvas.width ||
		head.y < 0 || head.y >= canvas.height ||
		snake.body.some(function(segment) {
			return segment.x === head.x && segment.y === head.y;
		})
	) {
		clearInterval(timerId);
		alert("游戏结束，得分：" + score);
		return;
	}

	// 判断是否吃到食物
	if (head.x === food.x && head.y === food.y) {
		snake.body.unshift(head);
		generateFood();
		score++;
		scoreEl.innerText = score;
	} else {
		snake.body.pop();
		snake.body.unshift(head);
	}

	render();
}

// 开始游戏
function startGame() {
	// 初始化蛇和食物
	snake = {
		body: [
			{x: 140, y: 140},
			{x: 130, y: 140},
			{x: 120, y: 140},
			{x: 110, y: 140},
			{x: 100, y: 140},
		],
		direction: "right"
	};
	generateFood();
	score = 0;
	scoreEl.innerText = score;

	// 渲染画布
	render();

	// 启动计时器
	timerId = setInterval(moveSnake, 100);
}

// 开始按钮点击事件
var startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startGame);

// 键盘按下事
document.addEventListener("keydown", function(event) {
	switch (event.code) {
		case "ArrowUp":
			if (snake.direction !== "down") {
				snake.direction = "up";
			}
			break;
		case "ArrowDown":
			if (snake.direction !== "up") {
				snake.direction = "down";
			}
			break;
		case "ArrowLeft":
			if (snake.direction !== "right") {
				snake.direction = "left";
			}
			break;
		case "ArrowRight":
			if (snake.direction !== "left") {
				snake.direction = "right";
			}
			break;
	}
});

var upBtn = document.getElementById("upBtn");
var downBtn = document.getElementById("downBtn");
var leftBtn = document.getElementById("leftBtn");
var rightBtn = document.getElementById("rightBtn");

upBtn.addEventListener("click", function() {
	if (snake.direction !== "down") {
		snake.direction = "up";
	}
});

downBtn.addEventListener("click", function() {
	if (snake.direction !== "up") {
		snake.direction = "down";
	}
});

leftBtn.addEventListener("click", function() {
	if (snake.direction !== "right") {
		snake.direction = "left";
	}
});

rightBtn.addEventListener("click", function() {
	if (snake.direction !== "left") {
		snake.direction = "right";
	}
});
