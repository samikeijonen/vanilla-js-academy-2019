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

	shuffle( monsters );

	// Loop monsters.
	app.innerHTML = monsters.map( function ( monster ) {
		return `<img src="img/${ sanitizeHTML( monster ) }.svg" alt="${ sanitizeHTML( monster ) }">`
	} ).join( '' );
})();
