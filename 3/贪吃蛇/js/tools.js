/**
 * Created by l on 2019/7/18.
 */

(function () {
    var Tools = {
        getRandom: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    //±©Â¶Tools¸øwindow
    window.Tools = Tools;
})();
