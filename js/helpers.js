/**
 * Add container for speak.
 *
 * @param {string} ariaLive Aria live attribute.
 */
function addSpeakContainer( ariaLive ) {
	ariaLive = ariaLive || 'polite';

	const container = document.createElement( 'div' );
	container.id = 'a11y-speak-' + ariaLive;
	container.className = 'a11y-speak-region sr-only';
	container.setAttribute( 'aria-live', ariaLive );
	container.setAttribute( 'aria-relevant', 'additions text' );
	container.setAttribute( 'aria-atomic', 'true' );

	document.querySelector( 'body' ).appendChild( container );
}

/**
 * Allows announcing dynamic interface updates to screen readers using ARIA live regions.
 *
 * @param {string} message  The message to be announced by Assistive Technologies.
 * @param {string} ariaLive Optional. The politeness level for aria-live. Possible values:
 *                          polite or assertive. Default polite.
 */
function speak( message, ariaLive ) {
	const containerPolite = document.getElementById( 'a11y-speak-polite' );
	const containerAssertive = document.getElementById( 'a11y-speak-assertive' );

	if ( containerAssertive && 'assertive' === ariaLive ) {
		containerAssertive.textContent = message;
	} else if ( containerPolite ) {
		containerPolite.textContent = message;
	}
}

/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
 var sanitizeHTML = function ( str ) {
	var temp = document.createElement( 'div' );
	temp.textContent = str;
	return temp.innerHTML;
};

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
 var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};
