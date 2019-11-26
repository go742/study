/**
 * Created by l on 2019/7/22.
 */

//-------------------Tools--------------------
;(function () {
    var Tools = {
        getRandom: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    //��¶Tools��window
    window.Tools = Tools;
})()

//-------------------Food--------------------
;(function () {
    var position = "absolute";
//��¼��һ�δ�����ʳ�Ϊɾ����׼��
    var elements = [];
    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;

        this.width = options.width || 20;
        this.height = options.height || 20;

        this.color = options.color || "green";
    }

//��Ⱦ
    Food.prototype.render = function (map) {
        //ɾ��֮ǰ������ʳ��
        remove();

        //�������x��y��ֵ
        this.x = Tools.getRandom(0, map.offsetWidth/this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight/this.height - 1) * this.height;

        //��̬����div  ҳ������ʾ��ʳ��
        var div = document.createElement("div");
        map.appendChild(div);

        elements.push(div);

        //����div����ʽ
        div.style.position = position;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
    };

    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            //ɾ��div
            elements[i].parentNode.removeChild(elements[i]);
            //ɾ�������е�Ԫ��
            /*
             * ɾ������Ԫ��
             * ��һ�����������ĸ�Ԫ�ؿ�ʼɾ��
             * �ڶ���������ɾ������Ԫ��
             * */
            elements.splice(i, 1)
        }
    }

    //��Food���캯�������ⲿ���Է���
    window.Food = Food;
})()

//-------------------Snake--------------------
;(function () {

    var position = "absolute";
    //��¼֮ǰ��������
    var elements = [];
    function Snake(options) {
        options = options || {};
        //�߽ڵĴ�С
        this.width = options.width || 20;
        this.height = options.height || 20;
        //���ƶ��ķ���
        this.direction = options.direction || "right";
        //�ߵ����壨�߽ڣ�  ��һ��Ԫ������ͷ
        this.body = [
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "blue"},
            {x: 1, y: 2, color: "blue"}
        ];
    }

    Snake.prototype.render = function (map) {
        //ɾ��֮ǰ��������
        remove();
        //��ÿһ���߽���Ⱦ����ͼ��
        for (var i = 0, len = this.body.length; i < len; i++){
            //�߽�
            var object = this.body[i];

            var div = document.createElement("div");
            map.appendChild(div);

            //��¼��ǰ��
            elements.push(div);

            //������ʽ
            div.style.position = position;
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = object.x * this.width + "px";
            div.style.top = object.y * this.height + "px";
            div.style.backgroundColor = object.color;
        }
    };
    //˽�еĳ�Ա
    function remove() {
        for (var i = elements.length - 1; i >=0; i--) {
            //ɾ��div
            elements[i].parentNode.removeChild(elements[i]);
            //ɾ�������е�Ԫ��
            elements.splice(i, 1);
        }
    }

    Snake.prototype.move = function (food, map) {
        //�����ߵ������ƶ�  ��ǰ�߽��ƶ�����һ���߽ڵ�λ��
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //������ͷ���ƶ�
        //�ж����ƶ��ķ���
        var head = this.body[0];
        switch(this.direction) {
            case "right":
                head.x += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "top":
                head.y -= 1;
                break;
            case "bottom":
                head.y += 1;
                break;
        }
        //�ж���ͷ�Ƿ��ʳ��������غ�
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if (headX === food.x && headY === food.y) {
            //��������һ��\
            //��ȡ�ߵ����һ��
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            //����ڵ�ͼ����������ʳ��
            food.render(map);
        }
    };

    //��¶���캯�����ⲿ
    window.Snake = Snake;
})()

//-------------------Game--------------------
;(function () {
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
})()

//-------------------����--------------------
;(function () {
    var map = document.getElementById("map");
    var game = new Game(map);
    game.start();
})()
