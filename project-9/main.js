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

	// Array for storing top category names retrieved from response.
	var nameArray = [];

	// Array for storing top category IDs retrieved from response.
	var idArray = [];

	// Array for storing top category count retrieved from response.
	var countArray = [];

	// Object for all above info.
	var allInfo = {};

	/**
	 * Render article markup.
	 *
	 * @param {object} data Data to handle.
	 */
	var renderArticles = function ( data ) {
		console.log( data, allInfo );

		// Loop articles (nested array).
		var k = 0;
		app.innerHTML = data.map( function ( articles ) {
			k++;
			return `<h2>${ sanitizeHTML( allInfo.name[k - 1] ) } (${ sanitizeHTML( allInfo.count[k - 1] ) } total)</h2><ul>` + articles.map( function ( article ) {
				return `<li><a href="${ sanitizeHTML( article.link ) }">${ sanitizeHTML( article.title.rendered ) }</a></li>`;
			} ).join( '' ) + '</ul>';
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

			if ( data.length > 0 ) {
				// Push names.
				data.map( item => nameArray.push( item.name ) );

				// Push IDs.
				data.map( item => idArray.push( item.id ) );

				// Push counts.
				data.map( item => countArray.push( item.count ) );
			}
			console.log( nameArray, idArray, countArray );

			// Return object of all info.
			allInfo = {
				name: nameArray,
				id: idArray,
				count: countArray,
			}
			console.log( allInfo );
			return allInfo;
		} ).then( function ( info ) {
			console.log( info, info.id );
			// Return an promise which will return "JSON response" array for all IDs.
			// Promise.all means "Wait for these things", not "Do these things".
			return Promise.all( info.id.map( id => {
				// Fetch articles based on category ID, return JSON response.
				return fetch( `${ baseUrl }posts?per_page=4&categories=${ id }` ).then( res => res.json() );
			} ) );
		 } ).then( function ( res ) {
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
