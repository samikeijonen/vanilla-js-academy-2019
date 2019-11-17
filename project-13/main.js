(function() {
	var toc = document.querySelector( '#js-toc' );

	// Bail if we don't have the table of contents.
	if ( ! toc ) {
		return;
	}

	// Headings.
	var headings = Array.prototype.slice.call( document.querySelectorAll( 'h2' ) );

	// Bail if we don't have the table of contents.
	if ( ! headings.length > 0 ) {
		return;
	}

	/**
	 * Render table of contents.
	 */
	 var renderToc = function () {
		// Add missing IDs.
		headings.forEach( heading => {
			if ( heading.id.length < 1 ) {
				// Replace anything that's not a letter or number with dashes.
				heading.id = heading.textContent.replace( /[^a-z0-9]+/gi, '-' );
				heading.id = heading.id.toLowerCase();
			}
		} );

		toc.innerHTML = '<ul class="toc">' +
			headings.map( function ( heading ) {
				return `<li><a href="#${ heading.id }">${ heading.textContent }</a></li>`
			} ).join( '' ) +
		'</ul>';
	};

	renderToc();
})();
