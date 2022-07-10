function createAudio(src,loop,volume,autoplay){
    var obj = document.createElement('audio');
    obj.src = src;
    obj.loop = loop;
    obj.autoplay = autoplay;
    obj.volume = volume;
    //obj.play();
    return obj;
}
function createDiv(x,y,w,h,parent){
    var obj = document.createElement('div');
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 32;
    this.h = h || 32;
    obj.style.position = 'absolute';
    obj.style.left = this.x + 'px';
    obj.style.top =  this.y + 'px';
    obj.style.width = this.w + 'px';
    obj.style.height = this.h + 'px';
    parent.appendChild(obj);
    return obj;
}
function position(obj,x,y){
    obj.style.left = x + 'px';
    obj.style.top = y + 'px';
    return obj;
}
function alignInDisplay(objA,objB,type){//type==显示方式 如 居中 顶部靠左…
    switch (type) {
    case 'center':
        position(objA,objB.offsetWidth / 2 - objA.offsetWidth / 2,objB.offsetHeight / 2 - objA.offsetHeight / 2);
        break;

    default:
        break;
    }
    return objA;
}
function setColor(obj,color){
    obj.style.backgroundColor = color || '';
    return obj;
}
function setBgImage(obj,imageSrc){
    obj.style.backgroundImage = 'url(' + imageSrc + ')';
    return obj;
}
function border(obj,border){
    obj.style.border = border || '1px solid black';
    return obj;
}
function setText(obj,text){
    this.fontSize = text.fontSize || 16;
    this.color = text.color || 'balck';
    this.textAlign = text.align || 'left';
    this.lineHeight = text.height || text.fontSize;
    obj.style.fontSize = this.fontSize + 'px';
    obj.style.color = this.color;
    obj.style.textAlign = this.textAlign;
    obj.style.lineHeight = this.lineHeight + 'px';
    obj.innerText = text.text;
    return obj;
}
function getItem(arr,attr,search){
    var item = {};
    arr.forEach( (a) => {
                    if(a[attr.LR]==search.LR&&a[attr.num] == search.num){
                        item = a;
                    }
                });
    return item;
}
