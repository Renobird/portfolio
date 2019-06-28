const animateName = {

	init: function(){
		this.element = document.querySelector(".name");
		this.name = this.element.innerText;
		this.clone = null;
		this.lastScrollTop = 0;
		this.repositionLetters();
		this.attachListeners();
	},

	repositionLetters: function(){
		var letters = Array.from(this.name.split(' ').join('')); // remove the space
		var moved = [];
		letters.forEach(function(letter) {
			var randomNum = animateName.getRandomInt();
			var span = "<span style='top:" + randomNum +"px; position:relative; z-index:2' data-orig="+ randomNum +"px>" + letter + "</span>";
			moved.push(span);
		});

		var node = document.createElement("h1");
		node.className = "letters";
		node.innerHTML = moved.join(" ");
		this.clone = node;
		this.element.parentNode.appendChild(node);
	},

	onScroll: function(){
		var scrollDirection = this.getScrollDirection();
		var letters = this.clone.querySelectorAll("span");

		letters.forEach(function(letter){
			var fired = false;
			if (scrollDirection == 'up' && fired === false){
				animateName.onScrollUp(letter);
				fired = true;
			} else if (scrollDirection == 'down'){
				animateName.onScrollDown(letter);
			}
		});
	},

	onScrollUp: function(letter){
		var dataOrig = letter.getAttribute('data-orig');
		this.reset();
		letter.style.top = String(dataOrig);
	},

	onScrollDown: function(letter){
		this.clearReset();
		var scrollTop = this.getScrollTop();
		var scrollLoc = scrollTop / 120 || 0;
		var currentPos = parseInt(letter.style.top.substring(0, letter.style.top.length - 2));
		var newPos = false;

		if (currentPos < 0){
			newPos = Math.round(currentPos + scrollLoc);
			if (newPos > 0) newPos = 0;
		} else if (currentPos > 0) {
			newPos = Math.round(currentPos - scrollLoc);
			if (newPos < 0) newPos = 0;
		}

		if (newPos !== false){
			letter.style.top = String(newPos) + "px";
		}
	
	},

	getScrollDirection: function(){
		var direction = null;
		var scrollTop = this.getScrollTop();

		if(this.lastScrollTop - scrollTop < 0){
			direction = 'down';
		} else if(this.lastScrollTop - scrollTop > 0){
			direction = 'up';
		}
		
		this.lastScrollTop = scrollTop;
		return direction;
	},

	getScrollTop: function(){
		return window.pageYOffset || window.scrollTop;
	},

	getRandomInt: function() {
		// Ensures all letters move some, and they all stay at least partially in the viewport 
		randNum = Math.floor( Math.random() * (280 - 15 + 1)) + 15; 
		randNum *= Math.floor( Math.random() * 2) == 1 ? 1 : -1; // gonna need some negative values
		return randNum;
	},

	reset: function(){
		this.clone.classList.add("reset");
	},

	clearReset: function(){
		this.clone.classList.remove("reset");
	},

	attachListeners: function(){
		window.addEventListener('scroll', function() {
			animateName.onScroll();
		});
	}
}