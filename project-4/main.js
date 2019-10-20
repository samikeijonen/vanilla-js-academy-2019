(function() {
	var text = document.querySelector( '.js-text' );

	// Bail if we don't have textarea field.
	if ( ! text ) {
		return;
	}

	var textCount = document.querySelector( '.js-char-count' );

	/**
	 * Calculate textarea lenght and output using textContent.
	 */
	var handleInput = function () {
		// Update char count.
		var charCount = text.value.length
		textCount.textContent = charCount;

		// Speak the dynamic change.
		speak( 'You\'ve written ' + charCount +  ' characters.' );
	}

	text.addEventListener( 'input', handleInput, false );

	// Create div for speak.
	addSpeakContainer();

	// Update fields on page load.
	handleInput();
})();
