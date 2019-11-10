/**
 * Fetch articles based on most popular categories by post count.
 */
(function() {
	var app = document.querySelector( '#app' );

	// Bail if we don't have the app.
	if ( ! app ) {
		return;
	}

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

	shuffle( monsters );

	/**
	 * Loop monsters but show door at first.
	 */
	var startGame = function () {
		app.innerHTML = '<div class="grid">' +
			monsters.map( function ( monster ) {
				return `<div class"js-monster-wrapper"><button class="button--light js-reveal" data-monster="${ sanitizeHTML( monster ) }">
					<img class="js-door" src="img/door.svg" alt="Reveal monster, or?" data-monster="${ monster }">
				</button></div>`
			} ).join( '' ) +
		'</div>';
	};

	/**
	 * Click handler.
	 *
	 * @param {Object} e Clicked object.
	 */
	var handleClick = function ( e ) {
		var clicked = e.target.closest( '.js-reveal' )
		var playAgain = e.target.closest( '.js-play-again' )

		// Bail if not clicking reveal button or elements inside it. Or play again button.
		if ( ! clicked && ! playAgain ) {
			return;
		}

		// Play again.
		if ( playAgain ) {
			startGame();
			return;
		}

		// Which monster or sock this door will open.
		var whichOne = clicked.getAttribute( 'data-monster' );

		// Update parent node with revealed image.
		clicked.parentNode.innerHTML = `<img alt="${ sanitizeHTML( whichOne ) }" src="img/${ sanitizeHTML( whichOne ) }.svg">`;

		// Add to array which one have been opened.
		clickedMonsters.push( whichOne );

		// Check if the sock is the last one to click.
		var clickedMonstersLength = clickedMonsters.length;
		var MonstersLength = monsters.length;
		if ( whichOne === 'sock' && clickedMonstersLength !== MonstersLength ) {
			messageText = `Game over! You got ${ clickedMonstersLength } / ${ MonstersLength } points.`;
		} else if ( whichOne === 'sock' && clickedMonstersLength === MonstersLength ) {
			messageText = 'You made it, congrats!';
		}

		// Game message.
		app.innerHTML = `<h2>${ messageText }</h2>
		<button class="js-play-again">Play again</button>
		`;
	};

	document.addEventListener( 'click', handleClick, false );

	// Start game.
	startGame();
})();
