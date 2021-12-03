export default class MapBox {
    constructor(id) {
        this.id = id;
    }

    render() {
        return /*html*/ `
            <div class="mapbox" id="${this.id}"></div>
        `;

        this.init();
    }

    init() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFkZWVsZSIsImEiOiJja3dreGd0YWQxa2dtMnZtbGRzZTdkMHRvIn0.NX_AW-qw5_D6wG-NuHfpBA';

        setTimeout(() => {
            const map = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: [-74.5, 40], // starting position [lng, lat]
                zoom: 9 // starting zoom
            });
            map.addControl(
                new mapboxgl.GeolocateControl({
                positionOptions: {
                enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
                })
            );
        }, 100);
    }
}
