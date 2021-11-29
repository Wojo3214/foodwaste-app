import Router from "../src/router.js";
import { hideNav } from "../src/router.js";

class HomePage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        hideNav();
        this.initMap();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="home" class="page">
             <h2>Home Page</h2>
             <div id="map-container"></div>
        </section>

        
            
        
        `;
    }  
    initMap(){
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFkZWVsZSIsImEiOiJjazdkMWF3NjIwNTBiM2lud2k3cjY0Njl5In0.d6TBUltXIwgnMsKbwESW7g';
        const map = new mapboxgl.Map({
        container: "map-container", // container ID
        style: 'mapbox://styles/madeele/ckwkolkxz4dpc14p3ss9uff6r', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
        });
    }
    
}

export default HomePage;