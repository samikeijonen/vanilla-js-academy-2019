(function() {
	var quote = document.querySelector( '.js-random-ron' );

	// Bail if we don't have quote.
	if ( ! quote ) {
		return;
	}

	var endPoint = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
	var newQuote = document.querySelector( '.js-new-ron' );
	var quotes = [];

	/**
	 * Don't duplicate the same data again.
	 *
	 * @param {string} data Data from the API.
	 */
	var addContent = function ( data ) {
		// If data is already there, fetch again.
		if ( quotes.indexOf( data ) > -1 ) {
			fetchQuote();
		} else {
			quotes.push( data );
			console.log( quotes );
		}

		// Add quote to the page.
		quote.textContent = data;

		// Speak the dynamic change.
		speak( 'New random quote have been generated.' );

		// Reset array after 50 items and start over.
		if ( quotes.length > 49 ) {
			quotes = [];
		}
	}

	/**
	 * Fetch Quote.
	 */
	var fetchQuote = function () {
		fetch( endPoint ).then( function ( response ) {
			// The API call was successful.
			if ( response.ok ) {
				return response.json();
			} else {
				return Promise.reject( response );
			}
		} ).then( function ( data ) {
			addContent( data[0] );
		} ).catch( function ( err ) {
			// There was an error.
			console.warn( 'Something went wrong.', err );
			quote.textContent = 'Something went wrong. Can you try again?';
		} );
	};

	/**
	 * Fetch Quote on click.
	 */
	 var handleClick = function () {
		fetchQuote();
	 }

	// Listen button click.
	newQuote.addEventListener( 'click', handleClick, false );

	// Create div for speak.
	addSpeakContainer();

	// Fetch Quote on page load.
	fetchQuote();
})();
