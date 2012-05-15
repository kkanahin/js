(function(){
var ua = navigator.userAgent.toLowerCase();
var isOpera = (ua.indexOf('opera')  > -1);
var isIE = (!isOpera && ua.indexOf('msie') > -1);
 
function getDocumentHeight() {
  return Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollHeight : document.documentElement.scrollHeight, getViewportHeight());
}
 
function getViewportHeight() {
  return ((document.compatMode || isIE) && !isOpera) ? (document.compatMode == 'CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight : (document.parentWindow || document.defaultView).innerHeight;
}
function getDocumentWidth() {
  return Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollWidth : document.documentElement.scrollWidth, getViewportWidth());
}
 
function getViewportWidth() {
  return ((document.compatMode || isIE) && !isOpera) ? (document.compatMode == 'CSS1Compat') ? document.documentElement.clientWidth : document.body.clientWidth : (document.parentWindow || document.defaultView).innerWidth;
}
function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (1) {
            curleft+=obj.offsetLeft;
            if (!obj.offsetParent) {
                break;
            }
            obj=obj.offsetParent;
        }
    } else if (obj.x) {
        curleft+=obj.x;
    }
    return curleft;
}
 
function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (1) {
            curtop+=obj.offsetTop;
            if (!obj.offsetParent) {
                break;
            }
            obj=obj.offsetParent;
        }
    } else if (obj.y) {
        curtop+=obj.y;
    }
    return curtop;
}
function mark_image(){
    img_list=document.getElementsByTagName('img');
    for(var i=0;i<img_list.length;i++){
        if (!img_list[i].getAttribute('data-mark')){
            img_list[i].setAttribute('data-position',img_list[i].style.position);
            img_list[i].setAttribute('data-zIndex',img_list[i].style.zIndex);
            img_list[i].setAttribute('data-mark',true);
            img_list[i].style.zIndex=1001;
            img_list[i].style.position='relative';
        }
   } 
}  
function scroll_page(){
high_layer_div.style.height=getDocumentHeight().toString().concat('px');
high_layer_div.style.width=getDocumentWidth().toString().concat('px');
mark_image();
}
var high_layer_div=document.createElement('div');
high_layer_div.id="div_high_layer";
high_layer_div.style.height=getDocumentHeight().toString().concat('px');
high_layer_div.style.width=getDocumentWidth().toString().concat('px');
high_layer_div.style.position="absolute";
high_layer_div.style.left="0px";
high_layer_div.style.top="0px";
high_layer_div.style.backgroundColor="black";
high_layer_div.style.opacity="0.5";
high_layer_div.style.zIndex='10000';
document.body.appendChild(high_layer_div);
mark_image();
window.onscroll=scroll_page();

})()
