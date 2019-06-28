const viewer = {

	modal: document.getElementById('modal'),
	img_dir: "assets/images/",
	loading_class: 'loading',
	open_trigger: '.modal-trigger',
	close_triggers: '.close, .overlay',
	container: '.modal_content',
	no_body_scroll: 'no-scroll',

	init: function(){
		if (this.modal) this.attachListeners();
	},

	openModal: function(trigger) {
		this.modal.style.display = 'block';
		this.setContent(trigger);
		this.bodyScroll(false);
	},

	closeModal: function() {
		var container = this.modal.querySelector(this.container);
		this.modal.style.display = 'none';
		container.scrollTop = 0; // reset scroll position
		container.innerHTML = ''; // clear old content
		this.bodyScroll(true); 
	},

	setContent: function(trigger){
		
		// large image names are stored an array in the data-large attribute
		var large_images = JSON.parse(trigger.getAttribute('data-large'));

		// I sure wish ES6 had included Object.forEach(), this works in most modern browsers.
		Object.keys(large_images[0]).forEach(function(key){
			
			var name = key;
			var caption = large_images[0][key];
			var html = "<figure class='loading'>";
			
			if (caption.length > 0){
				html += "<figcaption>" + caption + "</figcaption>";
			}

			html += "<img src='" + viewer.img_dir + "loader.gif' data-id='" + name + "' /></figure>";

			viewer.modal.querySelector(viewer.container).innerHTML += html;

			var fullImage = new Image();
			fullImage.src = viewer.img_dir + name;

			// when image has loaded swap the src attributes to remove the loader.
			fullImage.onload = function() {
				var img = viewer.modal.querySelector("[data-id='" + name + "']");
				img.src = fullImage.src;
				img.parentNode.classList.remove(viewer.loading_class);
			};

		});

	},

	bodyScroll: function(scroll){
		
		if (scroll === true){
			document.body.classList.remove(this.no_body_scroll); 
		} else {
			document.body.classList.add(this.no_body_scroll); 
		}

	},

	attachListeners: function(){

		// modal-trigger click
		document.addEventListener('click', function (event) {

			// not a modal trigger, so we split.
			if (!event.target.matches(viewer.open_trigger)) return; 
			
			// don't follow the link. 
			event.preventDefault();

			// open modal
			viewer.openModal(event.target);

		}, false);

		// close-triggers
		var closeTriggers = this.modal.querySelectorAll(this.close_triggers);
		
		// add closeModal listener
		closeTriggers.forEach(function(trigger){
			trigger.addEventListener('click', function(event){
				viewer.closeModal();
			});
		});

		// Escape key close modal
		document.onkeydown = function(event) {
			event = event || window.event;
			if (event.keyCode == 27) {
				viewer.closeModal();
			}
		};
	}
}