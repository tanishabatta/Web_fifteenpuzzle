//old version before she started changing it 

var pieces; 
var axisY = '300px';
var axisX = '300px';
var moveabletile = 0;
var isPlaying = false;
var startTime;
var countTime = 0;
var stopTimer;

//once the page starts it calls the board and div elements
 window.onload = function (){
	var board = document.getElementById('board');
	pieces = board.getElementsByTagName('div');
	
	for (var i=0; i<pieces.length; i++){
		
	pieces[i].className = 'square';
	
	
	var x = i/4;
	pieces[i].style.top = (parseInt(x)*100) + 'px';

	
	if (i%4 == 0) {
			pieces[i].style.left = 0 + 'px';
		}else if (i%4 == 1) {
			pieces[i].style.left = 100 + 'px';
		}else if (i%4 == 2) {
			pieces[i].style.left = 200 + 'px';
		}else if (i%4 == 3) {
			pieces[i].style.left = 300 + 'px';
		}

	
	pieces[i].style.backgroundPosition= '-' + pieces[i].style.left + ' ' + '-'  + pieces[i].style.top;
		

	pieces[i].onmouseover = function(){
		if (check(parseInt(this.innerHTML))){
				this.className = "moveableTile";
			}
		};
		
		pieces[i].onmouseout = function(){
			this.className = "square";
		};

		pieces[i].onclick = function(){
			if (check(parseInt(this.innerHTML))){ 
				swap(this.innerHTML-1);
				if (finish()){ 
					win();
				}
				return;
			}
		};
	}
//starts the game, and swaps the tiles
	var btn = document.getElementById('shuffleButton');
	
	btn.onclick = function(){
		clear();
	startTime = new Date().getTime();
    stopTimer = setInterval(displayTime, 1000);
    isPlaying = true;
	play();
	
	
	
for (var i=0; i<400; i++){
  var num = parseInt(Math.random()* 100) %4;
  switch (num) {
    case 0:
      var temp = up(axisX, axisY);
      if ( temp != -1){
        swap(temp);
      }
      break;
    case 1:
      var temp = down(axisX, axisY);
      if ( temp != -1){
        swap(temp);
      }
      break;
    case 2:
      var temp = left(axisX, axisY);
      if ( temp != -1){
        swap(temp);
      }
      break;
    case 3:
      var temp = right(axisX, axisY);
      if (temp != -1){
        swap(temp);
      }
      break;
  }
}

	};
	
};

//checks if a tile can move, if it can it returns a true if not its false
function check(axis) {
	for (var i = pieces.length-1; i >= 0; i--){
		if (left(axisX, axisY) == (axis - 1) || right(axisX, axisY) == (axis - 1) || up(axisX, axisY) == (axis - 1) || down(axisX, axisY) == (axis - 1)) {
		return true;
}
}
	return false;
}

 
//sends user to a win page where they get a html and a alert with how much time it took them to complete the game
function win(){
  
	 window.location.href = "win.html";
  var endTime = new Date().getTime();
  var seconds = (endTime - startTime) / 1000;
  sessionStorage.setItem("timeTaken", seconds);
  audio.pause();

  

}

function clear(){
    countMoves = 0;
    clearInterval(stopTimer);
    countTime = 0;
    isPlaying = false;
}

function play() {
    var audio = document.getElementById('audio');
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
}

//checks if the user wins by matching the tiles with their proper positon
function finish(){
	var flag = true;
	for (var i = pieces.length-1; i >=0; i--){
		var top = parseInt(pieces[i].style.top);
		var left = parseInt(pieces[i].style.left);
		
		if (left != (i%4*100) || top != parseInt(i/4)*100){
			flag = false;
			break;
		}
	}
	return flag;
}

//checks how far left a tile can go
function left(x, y){
	var leftX = parseInt(x);
	var leftY = parseInt(y);
	
	if (leftX > 0){
		for (var i = pieces.length-1; i >= 0; i--){

			if (parseInt(pieces[i].style.left) + 100 == leftX && parseInt(pieces[i].style.top) == leftY){
				return i;
			} 
		}
	}
	else{
		return -1;
	}
}

//checks how far right a tile can go
function right (x, y){
var rightX = parseInt(x);
var rightY = parseInt(y);
if (rightX < 300){
	var foundIndex = -1;
	for (var i = pieces.length-1; i >= 0; i--){
		if (parseInt(pieces[i].style.left) - 100 == rightX && parseInt(pieces[i].style.top) == rightY) {
			foundIndex = i;
			break;
		}
	}
	return foundIndex;
}
else{
	return -1;
}

}

//checks how far up a tile can go
function up(x, y){
  var upX = parseInt(x);
  var upY = parseInt(y);
  if (upY > 0){
    for (var i = pieces.length-1; i >= 0; i--){
      switch (true) {
        case parseInt(pieces[i].style.top) + 100 == upY && parseInt(pieces[i].style.left) == upX:
          return i;
          break;
      }
    } 
  }
  else{
    return -1;
  }
}

//checks how far down a tile can go
function down(x, y) {
var downX = parseInt(x);
var downY = parseInt(y);
if (downY < 300) {
var found = false;
var i = 0;
while (!found && i < pieces.length) {
switch (true) {
case parseInt(pieces[i].style.top) - 100 == downY && parseInt(pieces[i].style.left) == downX:
found = true;
return i;
}
i++;
}
} else {
return -1;
}
}

//simple swap function for swapping tile
function swap(axis) {
	for (var i = pieces.length-1; i >= 0; i--) {
		if (i == axis) {
			var temp = pieces[axis].style.top;
			pieces[axis].style.top = axisY;
			axisY = temp;
			temp = pieces[axis].style.left;
			pieces[axis].style.left = axisX;
			axisX = temp;
			break;
		}
	}
}

//clears out the time 
 function displayTime(){
    countTime += 1;
    document.getElementById("outputTime").innerHTML = "Seconds: " + countTime;
}

//displays the timer and the word Seconds