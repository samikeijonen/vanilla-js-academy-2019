(function() {
	var text = document.querySelector( '.js-text' );

	// Bail if we don't have textarea field.
	if ( ! text ) {
		return;
	}

	var textCount = document.querySelector( '.js-char-count' );
	var wordCount = document.querySelector( '.js-word-count' );

	/**
	 * Calculate textarea lenght and output using textContent.
	 */
	var handleInput = function () {
		// Update char count.
		var charCount = text.value.length
		textCount.textContent = charCount;

		// Get words. \s for spaces, \n and \r for line breaks.
		var words = text.value.split( /[\n\r\s]+/g );

		// Remove empty arrays, meaning only spaces.
		var wordsCleaned = words.filter( function ( word ) {
			return word.length > 0;
		} );

		// Get count of words.
		var wordsCount = wordsCleaned.length;
		wordCount.textContent = wordsCount;

		// Speak the dynamic change.
		speak( 'You\'ve written ' + wordsCount + ' words and ' + charCount +  ' characters.' );
	}

	text.addEventListener( 'input', handleInput, false );

	// Create div for speak.
	addSpeakContainer();

	// Update fields on page load.
	handleInput();
})();
