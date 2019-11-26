/**
 * Created by l on 2019/7/20.
 */

(function () {

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
})();

//���Դ���
/*
var map = document.getElementById("map");
var snake = new Snake();
snake.render(map);*/
