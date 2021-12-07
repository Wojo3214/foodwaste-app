import router from "../src/router.js";
//import { hideNav } from "../src/router.js";

class SignUpPage {
    constructor(domElement){
        this.domElement = domElement;
        this.currentTab = 0;
        this.render();
        this.showTabs(this.currentTab);
        this.attachEvents();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="signup" class="page page--centered">
            <img src="./src/img/logo.svg" class="logo" alt="Logo">
            
            <h1>Tell us about you!</h1>
            <form id="signup-form">
                <!-- <div class="progress-bar">
                    <div class="bar"></div>
                </div> -->
                <div class="tab">
                    <label class="input-label">Email
                        <input type="email" name="mail" class="text-field" placeholder="Your email" oninput="this.className = ''">
                    </label>
                    <label class="input-label">Password
                        <input type="password" name="password" class="text-field" placeholder="Your password" oninput="this.className = ''">
                    </label>
                    <p class="text--centered">If you already are a part of the RawShare,<br><a href="#/login" class="paragraph-link">Log in to your account</a>.</p>
                </div>
                <div class="tab">
                    <div class="content--vertical">
                        <img src="../src/img/avatar.svg" alt="Profile picture" class="profile-pic">
                        <input type="submit" value="Add your profile image" class="btn btn--secondary btn--small">
                    </div>
                    <label class="input-label">First name
                        <input type="text" name="firstName" class="text-field" placeholder="Your first name">
                    </label>
                    <label class="input-label">Last name
                        <input type="text" name="lastName" class="text-field" placeholder="Your last name">
                    </label>
                    <label class="input-label">Phone number
                        <input type="number" name="phoneNumber" class="text-field" placeholder="Your phone number">
                    </label>
                </div>
                <div class="tab">
                    <label class="input-label">Street name
                        <input type="text" name="street" class="text-field" placeholder="Your street name">
                    </label>
                    <label class="input-label">Building num
                        <input type="text" name="buildingNum" class="text-field" placeholder="E.g 24A">
                    </label>
                    <label class="input-label">Postal code
                        <input type="text" name="postal" class="text-field" placeholder="E.g 8210">
                    </label>
                    <label class="input-label">City
                        <input type="text" name="city" class="text-field" placeholder="E.g Aarhus">
                    </label>
                    <label class="input-label">Country
                        <input list="browser-country" name="country" class="text-field" placeholder="E.g Denmark">
                        <datalist id="browser-country">
                            <option value="Denmark">
                            <option value="Poland">
                            <option value="Spain"></option>
                            <option value="Germany">
                            <option value="Czech Republic">
                        </datalist>
                    </label>
                </div>
            </form>
            
            <div class="btns-container btns-container--horizontal">
                <input type="button" value="Back" id="prev-btn" class="btn btn--secondary btn--normal" onclick="nextPrev(-1)">
                <input type="button" value="Next" id="next-btn" class="btn btn--primary btn--normal" onclick="nextPrev(1)">
            </div>  
        </section>
        `;
    }

    attachEvents(){
        window.nextPrev = (tabNum) => this.nextPrev(tabNum);
    }

    showTabs(n){
        //this function will display the specified tab in the form
        let tabs = document.querySelectorAll(".tab");
        tabs[n].style.display = "block";

        if(n == 0){
            document.getElementById("prev-btn").style.display = "none";
        } else {
            document.getElementById("prev-btn").style.display = "block"
        }

        if(n == (tabs.length - 1)){
            document.getElementById("next-btn").type = 'submit';
            document.getElementById("next-btn").value = "Finish";
            document.getElementById("next-btn").href = "#/home";
        } else {
            document.getElementById("next-btn").value = "Next";
        }

        //progressBar function
        //this.progressBar(n);
    }

    nextPrev(n){
        let tabs = document.querySelectorAll(".tab");
        //if(n == 1 && !this.validateForm()) return false;
        tabs[this.currentTab].style.display = "none";
        this.currentTab = this.currentTab + n;
        if(this.currentTab >= tabs.length){
            document.getElementById("signup-form").submit();
            document.getElementById("next-btn").href = "#/home";
            return false;
        } 
        
        this.showTabs(this.currentTab);
    }

    validateForm(){
        let tabs, y, i, valid = true;
        tabs = document.getElementsByClassName("tab");
        y = tabs[this.currentTab].getElementsByTagName("input");

        for(i = 0; i < y.length; i++){
            if(y[i].value == ""){
                y[i].className += " invalid";
                valid = false;
            }
        }
        if(valid){
            document.querySelector("bar")[this.currentTab].className += " finish";
        }
        return valid;
    }

    // progressBar(n){
    //     let bar = document.querySelector(".bar");
    //     let nextButton = document.getElementById("next-btn");
    //     let steps = document.querySelectorAll(".tab");
    //     let i;
    //     let width = "5px"

    //     for (i = 0; i < steps.length; i++){
    //         //bar.style.width = ((100+"%") / (steps.length)) * 100 + "%";
    //     }
    // }

    
}

export default SignUpPage;