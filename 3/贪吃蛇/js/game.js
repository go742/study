/**
 * Created by l on 2019/7/20.
 */


(function () {
    var that;//记录游戏对象
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function () {
        //把蛇和食物对象渲染到地图上
        this.food.render(this.map);
        this.snake.render(this.map);

        //测试move方法
        /*this.snake.move();
        this.snake.render(this.map);
        this.snake.move();
        this.snake.render(this.map);
        this.snake.move();
        this.snake.render(this.map);*/

        //开始游戏的逻辑
        //1.让蛇移动起来
        // 2.当蛇遇到边界游戏结束
        runSnake();
        //3.通过键盘控制蛇移动的方向
        bindKey();
        //4.宕摄遇到食物做相应处理


    };

    //通过键盘控制蛇移动的方向
    function bindKey() {
        document.addEventListener("keydown", function (e) {
            //console.log(e.keyCode);
            //37 - left
            //38 - top
            //39 - right
            //40 - bottom
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(that), false)
    }

    //私有的函数  让蛇移动
    function runSnake() {
        var timerId = setInterval(function () {
            //让蛇走一格
            //this.snake  //在定时器的function中this是指向window对象的
            //要获取游戏对象中的蛇属性
            this.snake.move(this.food, this.map);
            this.snake.render(this.map);


            //当蛇遇到边界游戏结束
            //获取蛇头的坐标
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                alert("Game Over");
                clearInterval(timerId);
            }
            if (headY < 0 || headY >= maxY) {
                alert("Game Over");
                clearInterval(timerId);
            }

        }.bind(that), 150);
    }

    window.Game = Game;
})();


