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
            <div class="header">
                <p class="back-button">back</p>
                <img class="profile-image" src="../src/img/avatar.svg">
                <p class="settings-button">sett</p>
            </div>
            <h1 class="profile-username padding--top--md text--centered">Ana Smith</h1>
            <div class="profile-content">
                <div id="statistics" class="content--horizontal space--between padding--top--md">
                    <div class="statistics content--vertical padding--top--sm padding--bottom--sm">
                        <p class="statistics-header">Food Shared</p>
                        <h2 class="food-shared">05</h2>
                    </div>
                    <div class="statistics content--vertical padding--top--sm padding--bottom--sm">
                        <p class="statistics-header">Food Collected</p>
                        <h2>12/14</h2>
                    </div>
                </div>
                <h2>Ana is sharing</h2>
            </div>
            
        </section>
        `;
    }  
}

export default ProfilePage;