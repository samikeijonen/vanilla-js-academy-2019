/**
 * Fetch articles based on most popular categories by post count.
 */
(function() {
	var app = document.querySelector( '#app' );

	// Bail if we don't have quote.
	if ( ! app ) {
		return;
	}

	var baseUrl = 'https://foxland.fi/wp-json/wp/v2/';

	var topCategories = `${ baseUrl }categories?taxonomy=category&per_page=4&orderby=count&order=desc`;

	// Array for all info.
	var allInfo = [];

	/**
	 * Render article markup.
	 *
	 * @param {object} data Data to handle.
	 */
	var renderArticles = function ( data ) {
		// Loop all info so that we can get all under same umbrella.
		var k = 0;
		allInfo.forEach( function ( field ) {
			// Add as articles object.
			field.articles = data[k];
			k++;
		} );

		console.log( data, allInfo );

		// Loop articles (nested array).
		app.innerHTML = allInfo.map( function ( info ) {
			return `
				<h2><a href="${ sanitizeHTML( info.link ) }">${ sanitizeHTML( info.name ) }</a> (${ sanitizeHTML( info.count ) } total)</h2>
				<ul>` +
					info.articles.map( function ( article ) {
						return `<li><a href="${ article.link }">${ article.title.rendered }</a></li>`;
					} ).join( '' ) +
				`</ul>`;
		} ).join( '' );
	};

	/**
	 * Fetch articles
	 *
	 * @param {string} fetchURL URL to fetch.
	 */
	var fetchArticles = function ( fetchURL ) {
		fetch( fetchURL ).then( function ( response ) {
			// The API call was successful.
			if ( response.ok ) {
				return response.json();
			} else {
				return Promise.reject( response );
			}
		} ).then( function ( data ) {
			// This is the JSON from our response.
			console.log( data );
			allInfo = data;
			return data;
		} ).then( function ( info ) {
			console.log( info );
			// Return an promise which will return "JSON response" array for all IDs.
			// Promise.all means "Wait for these things", not "Do these things".
			var all = Promise.all( info.map( item => {
				// Fetch articles based on category ID, return JSON response.
				return fetch( `${ baseUrl }posts?per_page=4&categories=${ item.id }` ).then( res => res.json() );
			} ) );

			return all;
		 } ).then( function ( res ) {
			 console.log( res );
			// Render articles.
			renderArticles( res );
			return res;
		  } ).catch( function ( err ) {
			// There was an error.
			console.warn( 'Something went wrong.', err );
		} );
	};

	// Load top articles.
	fetchArticles( topCategories );
})();
