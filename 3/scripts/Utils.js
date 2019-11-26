/**
 * Created by l on 2019/7/17.
 */
class Utils{
    static createDom(type,parent=document.body,style={}){
        let dom = document.createElement(type);
        parent.appendChild(dom);
        for(let prop in style){
            dom.style[prop] = style[prop];
        }
        return dom;
    }
    static dragElem(elem){
        elem.style.position = "absolute";
        elem.addEventListener("mousedown",Utils.mouseHandler);
    }
    static removeDrag(elem){
        elem.removeEventListener("mousedown",Utils.mouseHandler);
    }
    static mouseHandler(e){
        if(e.type==="mousedown"){
            e.currentTarget.point = {x:e.offsetX,y:e.offsetY};
            document.elem = e.currentTarget;
            document.addEventListener("mousemove",Utils.mouseHandler);
            document.addEventListener("mouseup",Utils.mouseHandler);
        }else if(e.type==="mousemove"){
            document.elem.style.left = e.x-document.elem.point.x+"px";
            document.elem.style.top = e.y-document.elem.point.y+"px";
        }else if(e.type==="mouseup"){
            document.removeEventListener("mousemove",Utils.mouseHandler);
            document.removeEventListener("mouseup",Utils.mouseHandler);
        }
    }
    static randomColor(alpha=1){
        if(alpha<0 || alpha>1) alpha=1;
        /*let color = "#";
        for(let i=0;i<3;i++){
            col+=Math.floor(Math.random()*256).toString(16).padStart(2,"0");
        }
        return col;*/
        let arr = [];
        for(let i=0;i<3;i++){
            arr.push(Math.floor(Math.random()*256));
        }
        return `rgba(${arr.join()},${alpha})`;
    }
    static random(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    }
}