(function() {
	var app = document.querySelector( '#app' );

	// Bail if we don't have the app.
	if ( ! app ) {
		return;
	}

	var location;

	// Call the IP API.
	fetch( 'https://ipapi.co/json').then( function ( response ) {
		if ( response.ok ) {
			return response.json();
		} else {
			return Promise.reject( response );
		}
	}).then( function ( data ) {

		// Store the location data to a variable.
		location = data;

		// Fetch weather API.
		return fetch( `https://api.weatherbit.io/v2.0/current?key=efe2e0a3f4ea4f4d9e2363cbed694091&lat=${ data.latitude }&lon=${ data.longitude }` );

	}).then( function ( response ) {
		if ( response.ok ) {
			return response.json();
		} else {
			return Promise.reject( response );
		}
	}).then( function ( weatherData ) {
		console.log( location, weatherData, weatherData.data[0].app_temp );
		app.innerHTML = `
		<h2>${ location.city }, ${ location.region }</h2>
		<figure class="weather-app__img">
			<img alt="${ weatherData.data[0].weather.description }" height="50" width="50" src="https://www.weatherbit.io/static/img/icons/${ weatherData.data[0].weather.icon }.png">
		</figure>
		<p>${ weatherData.data[0].app_temp }&deg;C</p>`;
	}).catch( function ( error ) {
		console.warn( error );
	});

})();
