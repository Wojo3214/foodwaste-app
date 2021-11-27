import Router from "../src/router.js";
import { hideNav } from "../src/router.js";

class SignUpPage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        hideNav();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="signup" class="page page--centered">
            <img src="./src/img/logo.svg" class="logo" alt="Logo">
            <h1>Good to see you back!</h1>
            <form>
                <label class="input-label">Email
                <input type="email" name="mail" class="text-field" placeholder="Your email">
                </label>
                <label class="input-label">Password
                <input type="password" name="password" class="text-field" placeholder="Your password">
                </label>
            </form>
            
            
            <p class="text--centered">If you already are a part of the RawShare,<br><a href="#/login" class="paragraph-link">Log in to your account</a>.</p>

            <div class="btns-container btns-container--vertical">
                <input type="submit" href="#/login" value="Log in" class="btn btn--primary">
            </div>  
        </section>
        `;
    }  
}

export default SignUpPage;