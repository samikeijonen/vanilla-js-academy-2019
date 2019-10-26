(function() {
	var quote = document.querySelector( '.js-random-ron' );

	// Bail if we don't have quote.
	if ( ! quote ) {
		return;
	}

	var endPoint = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';
	var newQuote = document.querySelector( '.js-new-ron' );

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
			// This is the JSON from our response.
			console.log( data );
			quote.textContent = data[0];
		} ).catch( function ( err ) {
			// There was an error.
			console.warn( 'Something went wrong.', err );
			quote.textContent = 'Something went wrong. Can you try again?';
		} );
	}

	/**
	 * Fetch new quote on button click.
	 */
	var handleClick = function () {
		fetchQuote();
	}

	// Listen button click.
	newQuote.addEventListener( 'click', handleClick, false );

	// Fetch Quote on page load.
	fetchQuote();
})();
