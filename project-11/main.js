/**
 * Fetch articles based on most popular categories by post count.
 */
(function() {
	var app = document.querySelector( '#app' );

	// Bail if we don't have the app.
	if ( ! app ) {
		return;
	}

	var message = document.querySelector( '#message' );

	// The monsters and socks.
	var monsters = [
		'monster1',
		'monster2',
		'monster3',
		'monster4',
		'monster5',
		'monster6',
		'monster7',
		'monster8',
		'monster9',
		'monster10',
		'monster11',
		'sock'
	];

	// Store clicked monsters.
	var clickedMonsters = [];

	var messageText = '';

	shuffle( monsters );

	// Loop monsters but show door at first.
	app.innerHTML = '<div class="grid">' +
		monsters.map( function ( monster ) {
			return `<button class="button--light js-reveal">
				<img class="js-door" src="img/door.svg" alt="Reveal monster, or?" data-monster="${ monster }">
				<img class="js-who-knows-what" src="img/${ sanitizeHTML( monster ) }.svg" alt="${ sanitizeHTML( monster ) }" tabindex="-1" hidden>
			</button>`
		} ).join( '' ) +
	'</div>';

	var handleClick = function ( e ) {
		var el = e.target;

		// Bail if not clicking reveal button or elements inside it.
		if ( ! el.closest( '.js-reveal' ) ) {
			return;
		}

		// Door is inside the button or the current target.
		var door = el.querySelector( '.js-door' ) || el;

		// Which monster or sock this door will open.
		var whichOne = door.getAttribute( 'data-monster' );

		// Add to array which one have been opened.
		clickedMonsters.push( whichOne );

		// Revealed image is inside the button or the next item of the current element.
		var revealed = el.querySelector( '.js-who-knows-what' ) || el.nextElementSibling;

		// Disable button on click.
		el.closest( '.js-reveal' ).setAttribute( 'disabled', '' );

		// Hide door.
		if ( door.getAttribute( 'data-monster' ) ) {
			door.setAttribute( 'hidden', '' );
		}

		// Reveal monster or??
		revealed.removeAttribute( 'hidden' );

		// Focus on the revealed image.
		revealed.focus();

		// Check if the sock is the last one to click.
		if ( whichOne === 'sock' && clickedMonsters.length !== monsters.length ) {
			messageText = 'Game over!';
		} else if ( whichOne === 'sock' && clickedMonsters.length == monsters.length ) {
			messageText = 'You made it, congrats!';
		}

		// Add message.
		message.textContent = messageText;
	};

	document.addEventListener( 'click', handleClick, false );
})();
