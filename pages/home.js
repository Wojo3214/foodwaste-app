import Router from "../src/router.js";
import { hideNav } from "../src/router.js";

class HomePage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        hideNav();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="home" class="page">
             <h2>Home Page</h2>
             <div id="map">blabla</div>
        </section>
        `;
    }  
}

export default HomePage;