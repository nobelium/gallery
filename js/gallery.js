var curimage = null;

window .onload = function(){
	var g = document.getElementsByClassName("gallery","ul");
	for(var i=0;i<g.length;i++){
		var link = document.getElementsByTagName("a",g[i]);
		for(var j=0;j<link.length;j++){
			link[j].onclick = function(event){
				event.preventDefault();
				showImage(this.parentNode);
				showOverlay();
			}
		}
		addSlideshow(g[i]);
	}
	
	var overlay = document.createElement("div");
	overlay.id = "overlay";
	document.body.appendChild(overlay);
	overlay.onclick = function() {hideOverlay();};
	
	var gallery = document.createElement("div");
	gallery.id = "gallery";
	gallery.innerHTML = '<div id="gallery_image"></div>'+'<div id="gallery_title"></div>'+
	'<div id="gallery_prev"><a href="">Previous</a></div>'+	'<div id="gallery_next"><a href="">Next</a></div>';
	document.body.appendChild(gallery);
	
	document.getElementById("gallery_prev").onclick =  function () {if(get_prevsibling(curimage)!=0)prevImage(); return false;};
	document.getElementById("gallery_next").onclick =  function () {if(get_nextsibling(curimage)!=0)nextImage(); return false;};
}

window.onresize = function() {adjust();};

function hideOverlay () {
	document.getElementById("overlay").style.display= 'none';
	document.getElementById("gallery").style.display = 'none';
	curimage = null;
}

function showOverlay () {
	var over = document.getElementById("overlay");
	var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
	var _docWidth = (document.width !== undefined) ? document.width : document.body.offsetWidth;
	over.style.left = "0 px";
	over.style.top = "0 px";
	over.style.height = _docHeight+"px";
	over.style.width = _docWidth+"px";
	over.style.position = "absolute";
	over.style.display = 'block';
}

function showImage(cur){
	curimage = cur;
	var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
	var _docWidth = (document.width !== undefined) ? document.width : document.body.offsetWidth;
	var img = document.getElementById("gallery_image");
	if(img.firstChild)img.removeChild(img.firstChild);
	img.appendChild(cur.firstChild.cloneNode(true));
	document.getElementById("gallery_title").innerHTML=cur.firstChild.firstChild.alt;
	
	var gallery = document.getElementById("gallery");
	gallery.className = cur.className;
	
	adjust();
	gallery.style.display = "block";
}

function adjust() {
	showOverlay();
	var obj = document.getElementById("gallery");
	if(!obj)return ;
	
	var t = window.scrollY + ( document.height / 2 ) - ( 510 / 2 );
	if ( t <= 0 ) t = 20;
	var l = window.scrollX + ( document.width / 2 ) - ( 650 / 2 );
	if ( l < 0 ) l = 0;
	obj.style.top = t + "px";
	obj.style.left = l + "px";	
}

document.onkeydown = function (event) {
	var key = event.keyCode;
	if(key==37)document.getElementById("gallery_prev").onclick();
	else if(key==39)document.getElementById("gallery_next").onclick();
	else if(key==27)hideOverlay();
} 

function prevImage() {
	showImage( get_prevsibling(curimage) );
}

function nextImage() {
	showImage( get_nextsibling(curimage) );
}

function get_nextsibling(n){
	x=n.nextSibling;
	if(x==null)return 0;
	while (x.nodeType!=1){ x=x.nextSibling; if(x==null)return 0;}
	return x;
}

function get_prevsibling(n){
	x=n.previousSibling;
	if(x==null)return 0;
	while (x.nodeType!=1){ x=x.previousSibling; if(x==null)return 0;}
	return x;
}


function addSlideshow (elem) {
	var div =  document.createElement("div");
	div.className = "slideshow";
	var span = document.createElement("span");
	span.innerHTML = elem.title;
	div.appendChild(span);
	var a = document.createElement("a");
	a.href = "";
	a.innerHTML = "&raquo; View as a Slideshow";
	a.onclick = function () {
		startShow(get_nextsibling(this.parentNode));
		return false;
	}
	div.appendChild(a);
	elem.parentNode.insertBefore(div,elem);
}

function startShow(obj){
	var elem = document.getElementsByTagName("li",obj);
	var gallery = document.getElementById("gallery");
	for ( var i = 0; i < elem.length; i++ ) 
	new function() {
		var cur = elem[i];
		setTimeout(function(){showImage( cur );setTimeout(function(){gallery.style.display="none";}, 4500 );}, i * 5000 );
	};
	setTimeout( hideOverlay, 5000 * elem.length );
	showOverlay();

}
