(function() {
	var app = document.querySelector( '#app' );

	// Bail if we don't have quote.
	if ( ! app ) {
		return;
	}

	var endPoint = 'https://foxland.fi/wp-json/wp/v2/posts';
	var allArticles = '';

	/**
	 * Fetch Quote.
	 */
	var fetchArticles = function () {
		fetch( endPoint ).then( function ( response ) {
			// The API call was successful.
			if ( response.ok ) {
				return response.json();
			} else {
				return Promise.reject( response );
			}
		} ).then( function ( articles ) {
			// This is the JSON from our response.
			console.log( articles );

			// Loop them
			app.innerHTML = '<ul>' + articles.map( function ( article ) {
				return '<li><a href="' + article.link + '">' + article.title.rendered + '</a></li>';
			} ).join('') + '</ul>';
		} ).catch( function ( err ) {
			// There was an error.
			console.warn( 'Something went wrong.', err );
		} );
	};

	// Load articles.
	fetchArticles();
})();
