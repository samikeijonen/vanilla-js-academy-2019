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
