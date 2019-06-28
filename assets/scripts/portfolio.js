const portfolio = {

	container: document.querySelector('.portfolio'),
	file_name: "portfolio.json",
	error_message: "Oops. Something went wrong while loading the portfolio. Please reload the page to try again.",

	init: function(){
		this.loadPortfolio();
	},

	loadPortfolio: function(){

		fetch(this.file_name)
			
		.then((response) => response.json())
		
		.then(function(data) {
			portfolio.processResponse(data);
		})
		.catch(function(error) {
			portfolio.error_message;
		}); 

	},

	processResponse: function(response){
		
		var html = [];
		var trigger_class = "modal-trigger";

		for (var i = 0; i < response.data.length; i++){
			var entry = response.data[i];
			var full_images = JSON.stringify(entry.full_images);
			var class_name = entry.href === false ? trigger_class : "";
			var href = entry.href != false ? entry.href : "#";
			var tags = entry.tags.map(function (tag) {
							return '<li>' + tag + '</li>';
						}).join("");
			
			var markup = `
						<article>
							<div class='col image' data-aos='${entry.animations.image}' data-aos-once='once' data-aos-offset='${entry.animations.img_offset}'>
								<a href='${href}' target='blank'><img src='assets/images/${entry.thumb}' data-large='${full_images}' class='${class_name}' title='img' alt='blah'/></a>
							</div>
							<div class='col text' data-aos='${entry.animations.text}' data-aos-once='once' data-aos-offset='${entry.animations.text_offset}' >
								<h3>${entry.title}</h3>
								<p>${entry.body}</p>
								<ul class='tags'>${tags}</ul>
							</div>
						</article>
					`;

			html.push(markup);
		}

		this.updateContainer(html.join("\n"));
	},

	updateContainer: function(html){
		this.container.innerHTML = html;
	}
}