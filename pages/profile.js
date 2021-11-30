import Router from "../src/router.js";
import { hideNav } from "../src/router.js";

class ProfilePage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        hideNav();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="profile" class="page">
             <h2>Profile Page</h2>
             <div >blabla</div>
        </section>
        `;
    }  
}

export default ProfilePage;