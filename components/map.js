function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFkZWVsZSIsImEiOiJja3dreGd0YWQxa2dtMnZtbGRzZTdkMHRvIn0.NX_AW-qw5_D6wG-NuHfpBA';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
}

initMap();