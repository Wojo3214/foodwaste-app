import router from "../src/router.js";

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
                <div class="tab-su">
                    <label class="input-label">Email
                        <input type="email" id="su-email" name="mail" class="text-field" placeholder="Your email" oninput="this.className = ''">
                    </label>
                    <label class="input-label">Password
                        <input type="password" id="su-password" name="password" class="text-field" placeholder="Your password" oninput="this.className = ''">
                    </label>
                    <p class="text--centered">If you already are a part of the RawShare,<br><a href="#/login" class="paragraph-link">Log in to your account</a>.</p>
                </div>
                <div class="tab-su">
                    <div class="content--vertical">
                        <img src="../src/img/avatar.svg" alt="Profile picture" class="profile-pic">
                        <input type="file" name="userPic" value="Add your profile image" accept="image/png, image/jpeg" class="btn btn--secondary btn--small">
                    </div>
                    <label class="input-label">First name
                        <input type="text" name="firstName" id="su-firstname" class="text-field" placeholder="Your first name">
                    </label>
                    <label class="input-label">Last name
                        <input type="text" name="lastName" id="su-lastname" class="text-field" placeholder="Your last name">
                    </label>
                    <label class="input-label">Phone number
                        <input type="number" name="phoneNumber" id="su-phone" class="text-field" placeholder="Your phone number">
                    </label>
                </div>
                <div class="tab-su">
                    <label class="input-label">Street name
                        <input type="text" name="street" id="su-street" class="text-field" placeholder="Your street name">
                    </label>
                    <label class="input-label">Building num
                        <input type="text" name="buildingNum" id="su-building" class="text-field" placeholder="E.g 24A">
                    </label>
                    <label class="input-label">Postal code
                        <input type="text" name="postal" id="su-postal-code" class="text-field" placeholder="E.g 8210">
                    </label>
                    <label class="input-label">City
                        <input type="text" name="city" id="su-city" class="text-field" placeholder="E.g Aarhus">
                    </label>
                    <label class="input-label">Country
                        <input list="browser-country" name="country" id="su-country" class="text-field" placeholder="E.g Denmark">
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
                <input type="button" value="Back" id="su-prev-btn" class="btn btn--secondary btn--normal" onclick="nextPrev(-1)">
                <input type="button" value="Next" id="su-next-btn" class="btn btn--primary btn--normal" onclick="nextPrev(1)">
                <input type="button" value="Finish" id="su-finish-btn" class="btn btn--primary btn--normal finish-btn" onclick="addUser()">
            </div>  
        </section>
        `;

        document.getElementById('su-finish-btn').style.display = "none";
    }

    attachEvents(){
        window.nextPrev = (tabNum) => this.nextPrev(tabNum);
        window.addUser = () => this.addUser();
    }

    showTabs(n){
        //this function will display the specified tab in the form
        let tabs = document.querySelectorAll(".tab-su");
        tabs[n].style.display = "block";
        console.log(tabs[n]);

        if(n == 0){
            document.getElementById("su-prev-btn").style.display = "none";
            document.getElementById('su-finish-btn').style.display = "none";
            document.getElementById("su-next-btn").style.display = "block";
        } else {
            document.getElementById("su-prev-btn").style.display = "block";
            document.getElementById('su-finish-btn').style.display = "none";
            document.getElementById("su-next-btn").style.display = "block";
        }

        if(n == (tabs.length - 1)){
            document.getElementById("su-next-btn").style.display = "none";
            document.getElementById('su-finish-btn').style.display = "block";
        } else {
            document.getElementById("su-next-btn").value = "Next";
        }

        //progressBar function
        //this.progressBar(n);
    }

    nextPrev(n){
        let tabs = document.querySelectorAll(".tab-su");
        //if(n == 1 && !this.validateForm()) return false;
        tabs[this.currentTab].style.display = "none";
        this.currentTab = this.currentTab + n;
        if(this.currentTab >= tabs.length){
            document.getElementById("signup-form").submit();
            document.getElementById("su-next-btn").href = "#/home";
            return false;
        } 
        
        this.showTabs(this.currentTab);
    }

    validateForm(){
        let tabs, y, i, valid = true;
        tabs = document.getElementsByClassName("tab-su");
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

    async savePhoto() {
        let userPhoto = document.querySelector('input[name=userPic]').files[0];
        console.log(userPhoto);

        const userImg = { userPhoto };
        const response = await fetch("http://localhost:3000//backend/userPicUpload.php?action=uploadPic", {
            method: "POST",
            enctype: "multipart/form-data",
            body: JSON.stringify(userImg)
        });

        const userImgAdded = await response.text();
        console.log(userImgAdded);
    }

    // add user to pass to php
    async addUser() {

        this.savePhoto();

        let email = document.querySelector("#su-email").value;
        let password = document.querySelector("#su-password").value;
        let firstname = document.querySelector("#su-firstname").value;
        let lastname = document.querySelector("#su-lastname").value;
        let userPhoto = document.querySelector('input[name=userPic]').files[0].name;
        let phone = document.querySelector("#su-phone").value;
        let street = document.querySelector("#su-street").value;
        let buildingNumber = document.querySelector("#su-building").value;
        let postalCode = document.querySelector("#su-postal-code").value;
        let city = document.querySelector("#su-city").value;
        let country = document.querySelector("#su-country").value;

        const newUser = { email, password, firstname, lastname, userPhoto, phone, street, buildingNumber, postalCode, city, country};
        console.log(newUser);

        const response = await fetch("http://localhost:3000//backend/login.php?action=addUser", {
            method: "POST",
            body: JSON.stringify(newUser)
        });

        //fetch the response
        const userData = await response.json();
        console.log(userData);

        // success redirect to #/home
        let addSuccess = userData.addUser;

        if(addSuccess == true) {
            router.navigateTo('#/login');
            alert('User is added. Please log in using your new credentials');
        }
        else {
            alert('Please fill out all fields');
        }
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