var curImage = null;

window .onload = function(){
	var gallery = document.createElement("div");
	gallery.id = "gallery";
	
	gallery.innerHTML = '<div id="gallery_image"></div>'+'<div id="gallery_prev"><a href="#">Previous</a></div>'+
	'<div id="gallery_next"><a href="#">Next</a></div>'+'<div id="gallery_title"></div>';
	document.body.appendChild(gallery);
	
	//document.getElementById("gallery_next").click = nextImage();
	//document.getElementById("gallery_prev").click = prevImage();
	
	var g = document.getElementsByClassName("gallery","ul");
	for(var i=0;i<g.length;i++){
		var link = document.getElementsByTagName("a",g[i]);
		for(var j=0;j<link.length;j++){
			link[j].onclick = function(event){
				event.preventDefault();
				alert("hi");
				showOverlay();
			}
		}
	}
	
	var overlay = document.createElement("div");
	overlay.id = "overlay";
	//overlay.onclick = hideOverlay();
	document.body.appendChild(overlay);
}

function hideOverlay () {
	curImage = null;
	document.getElementById("overlay");
	document.getElementById("gallery");
}

function showOverlay () {
	var over = document.getElementById("overlay");
	over.style.left = "0 px";
	over.style.right = "0 px";
	over.style.bottom = "0 px";
	over.style.top = "0 px";
	over.style.position = "fixed";
	
	over
}