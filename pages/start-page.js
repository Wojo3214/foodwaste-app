import Router from "../src/router.js";
import { hideNav } from "../src/router.js";

class StartPage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        hideNav();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="start" class="page page--centered">
            <img src="./src/img/logo.svg" class="logo" alt="Logo">
            <h1>Save food with us. Share it with others!</h1>
            <img src="./src/img/illustration-first.svg" alt="Illustration">

            <div class="btns-container btns-container--vertical">
                <a href="#/login" class="btn btn--primary btn--normal">Log in</a>
                <a href="#/signup" class="btn btn--secondary btn--normal">Sign up</a> 
            </div>  
        </section>
        `;
    }  
}

export default StartPage;