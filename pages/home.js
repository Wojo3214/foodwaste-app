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
             <div id="map"></div>
        </section>
        `;
    }  

    initMap(){
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFkZWVsZSIsImEiOiJja3dreGd0YWQxa2dtMnZtbGRzZTdkMHRvIn0.NX_AW-qw5_D6wG-NuHfpBA';
        const map = new mapboxgl.Map({
        container: "map", // container ID
        style: 'mapbox://styles/madeele/ckr68q2r40uu818pa4p2rn4w6', // style URL
        center: [-76.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
        });
    }
    
}

export default HomePage;