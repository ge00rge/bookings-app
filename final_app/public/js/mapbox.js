/* eslint-disable */

console.log('mapbox code reached!!');

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZ2UwMHJnZSIsImEiOiJja3UwMWFleXcxdHRnMm5wODE5dGhxNTdyIn0.FAqmK-pmZQdWbTt95M70ow';

  var map = new mapboxgl.Map({
    container: 'map',
    // defined in https://studio.mapbox.com/
    style: 'mapbox://styles/ge00rge/cku08c42w4a4j17uo6jr03072',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
