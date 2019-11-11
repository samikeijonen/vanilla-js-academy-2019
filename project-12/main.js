/**
 * Fetch articles based on most popular categories by post count.
 */
(function() {
	var toc = document.querySelector( '#js-toc' );

	// Bail if we don't have the table of contents.
	if ( ! toc ) {
		return;
	}

	// Titles.
	var titles = Array.prototype.slice.call( document.querySelectorAll( 'h2[id]' ) );

	// Bail if we don't have the table of contents.
	if ( ! titles.length > 0 ) {
		return;
	}

	/**
	 * Render table of contents.
	 */
	 var renderToc = function () {
		toc.innerHTML = '<ul class="toc">' +
			titles.map( function ( title ) {
				return `<li><a href="#${ title.id }">${ title.innerText }</a></li>`
			} ).join( '' ) +
		'</ul>';
	};

	renderToc();
})();
