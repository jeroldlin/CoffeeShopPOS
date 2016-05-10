window.onload = initialPage;

function initialPage(){
	TweenMax.staggerFrom(".menuRow", 0.2, {rotation:45, y:300, opacity:0}, 0.1);
	TweenMax.from("#linkToKitchen", 1, {rotation:90, y:500, opacity:0, delay:1.5});
}