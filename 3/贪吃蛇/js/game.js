/**
 * Created by l on 2019/7/20.
 */


(function () {
    var that;//��¼��Ϸ����
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function () {
        //���ߺ�ʳ�������Ⱦ����ͼ��
        this.food.render(this.map);
        this.snake.render(this.map);

        //����move����
        /*this.snake.move();
        this.snake.render(this.map);
        this.snake.move();
        this.snake.render(this.map);
        this.snake.move();
        this.snake.render(this.map);*/

        //��ʼ��Ϸ���߼�
        //1.�����ƶ�����
        // 2.���������߽���Ϸ����
        runSnake();
        //3.ͨ�����̿������ƶ��ķ���
        bindKey();
        //4.�������ʳ������Ӧ����


    };

    //ͨ�����̿������ƶ��ķ���
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

    //˽�еĺ���  �����ƶ�
    function runSnake() {
        var timerId = setInterval(function () {
            //������һ��
            //this.snake  //�ڶ�ʱ����function��this��ָ��window�����
            //Ҫ��ȡ��Ϸ�����е�������
            this.snake.move(this.food, this.map);
            this.snake.render(this.map);


            //���������߽���Ϸ����
            //��ȡ��ͷ������
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


