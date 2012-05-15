(function(){
var ua = navigator.userAgent.toLowerCase();
var isOpera = (ua.indexOf('opera')  > -1);
var isIE = (!isOpera && ua.indexOf('msie') > -1);
Event = (function() {
 
  var guid = 0
     
  function fixEvent(event) {
    event = event || window.event
   
    if ( event.isFixed ) {
      return event
    }
    event.isFixed = true
   
    event.preventDefault = event.preventDefault || function(){this.returnValue = false}
    event.stopPropagation = event.stopPropagaton || function(){this.cancelBubble = true}
     
    if (!event.target) {
        event.target = event.srcElement
    }
   
    if (!event.relatedTarget && event.fromElement) {
        event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
    }
   
    if ( event.pageX == null && event.clientX != null ) {
        var html = document.documentElement, body = document.body;
        event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
        event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
    }
   
    if ( !event.which && event.button ) {
        event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
    }
     
    return event
  } 
   
  /* Вызывается в контексте элемента всегда this = element */
  function commonHandle(event) {
    event = fixEvent(event)
     
    var handlers = this.events[event.type]
 
    for ( var g in handlers ) {
      var handler = handlers[g]
 
      var ret = handler.call(this, event)
      if ( ret === false ) {
          event.preventDefault()
          event.stopPropagation()
      }
    }
  }
   
  return {
    add: function(elem, type, handler) {
      if (elem.setInterval && ( elem != window && !elem.frameElement ) ) {
        elem = window;
      }
       
      if (!handler.guid) {
        handler.guid = ++guid
      }
       
      if (!elem.events) {
        elem.events = {}
        elem.handle = function(event) {
          if (typeof Event !== "undefined") {
            return commonHandle.call(elem, event)
          }
        }
      }
       
      if (!elem.events[type]) {
        elem.events[type] = {}       
       
        if (elem.addEventListener)
          elem.addEventListener(type, elem.handle, false)
        else if (elem.attachEvent)
          elem.attachEvent("on" + type, elem.handle)
      }
       
      elem.events[type][handler.guid] = handler
    },
     
    remove: function(elem, type, handler) {
      var handlers = elem.events && elem.events[type]
       
      if (!handlers) return
       
      delete handlers[handler.guid]
       
      for(var any in handlers) return
      if (elem.removeEventListener)
        elem.removeEventListener(type, elem.handle, false)
      else if (elem.detachEvent)
        elem.detachEvent("on" + type, elem.handle)
         
      delete elem.events[type]
     
       
      for (var any in elem.events) return
      try {
        delete elem.handle
        delete elem.events
      } catch(e) { // IE
        elem.removeAttribute("handle")
        elem.removeAttribute("events")
      }
    }
  }
}())

 
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
high_layer_div.style.width='100%';
high_layer_div.style.position="absolute";
high_layer_div.style.left="0px";
high_layer_div.style.top="0px";
high_layer_div.style.backgroundColor="black";
high_layer_div.style.opacity="0.5";
high_layer_div.style.zIndex='1000';
document.body.appendChild(high_layer_div);
mark_image();
Event.add(window,'onscroll',scroll_page)

})()
