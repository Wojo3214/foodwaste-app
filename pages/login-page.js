import Router from "../src/router.js";
import { hideNav } from "../src/router.js";

class LoginPage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        hideNav(true);
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="login" class="page page--centered">
            <img src="./src/img/logo.svg" class="logo" alt="Logo">
            <h1>Good to see you back!</h1>
            <form>
                <label class="input-label">Email
                <input type="email" name="mail" class="text-field" placeholder="Your email">
                </label>
                <label class="input-label">Password
                <input type="password" name="password" class="text-field" placeholder="Your password">
                </label>
                <a href="" class="link">Forgot my password</a>
            </form>
            
            
            <p class="text--centered">If you are not a part of the RawShare yet,<br><a href="#/signup" class="paragraph-link">Create an account</a>.</p>

            <div class="btns-container btns-container--vertical">
                <input type="submit" href="#/home" value="Log in" class="btn btn--primary btn--normal">
            </div>  
        </section>
        `;
    }  
}

export default LoginPage;