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
		textCount.textContent = text.value.length;
	}

	text.addEventListener( 'input', handleInput, false );
	document.addEventListener( 'DOMContentLoaded', handleInput, false );
})();
