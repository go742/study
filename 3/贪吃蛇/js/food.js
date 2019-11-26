/**
 * Created by l on 2019/7/18.
 */

//���е�js�ļ�����д���룬����ȫ��������

/*function fn() {
    //�ֲ�������
    var n = 1;
}
fn();*/

//�Ե��ú���   ����һ���µ������򣬱���������ͻ
(function () {
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
})();



//����
/*var map = document.getElementById("map");
var food = new Food();
food.render(map);*/

