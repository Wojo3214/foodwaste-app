import router from "../src/router.js";

class UpdateUserPage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        this.attachEvents();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="update" class="page page--centered">
            
            <h1>Tell us about you!</h1>
            <form id="update-form">
                <!-- <div class="progress-bar">
                    <div class="bar"></div>
                </div> -->
                <div class="tab-upd">
                    <label class="email input-label">Email</label>
                    <label class="password input-label">Password</label>
                    <p class="text--centered"></p>
                </div>
                <div class="tab-upd">
                    <div class="content--vertical">
                        <img src="../src/img/avatar.svg" alt="Profile picture" class="profile-pic">
                        <input type="submit" value="Add your profile image" class="btn btn--secondary btn--small">
                    </div>
                    <label class="firstname input-label">First name</label>
                    <label class="lastname input-label">Last name</label>
                    <label class="phone input-label">Phone number</label>
                </div>
                <div class="tab-upd">
                    <label class="street input-label">Street name</label>
                    <label class="building input-label">Building num</label>
                    <label class="postal-code input-label">Postal code</label>
                    <label class="city input-label">City</label>
                    <label class="country input-label">Country
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
                <input type="button" value="Update" id="upd-finish-btn" class="btn btn--primary btn--normal finish-btn" onclick="updateUser()">
            </div>  
        </section>
        `;
        this.defaultValue();
    }

    attachEvents(){
        window.updateUser = () => this.updateUser();
    }

    defaultValue() {
        let firstName = localStorage.getItem("firstName");
        let lastName = localStorage.getItem("lastName");
        let email = localStorage.getItem("email");
        let password = localStorage.getItem("password");
        let phone = localStorage.getItem("phone");
        let street = localStorage.getItem("street");
        let building = localStorage.getItem("building");
        let postalCode = localStorage.getItem("postalCode");
        let city = localStorage.getItem("city");
        let country = localStorage.getItem("country");



        document.querySelector(".tab-upd .email").innerHTML = "<input type='email' id='upd-email' name='mail' class='text-field' value=" + email + ">";
        document.querySelector(".tab-upd .password").innerHTML = "<input type='password' id='upd-password' name='password' class='text-field' value=" + password + ">";
        document.querySelector(".tab-upd .firstname").innerHTML = "<input type='text' name='firstName' id='upd-firstname' class='text-field' value=" + firstName +">";
        document.querySelector(".tab-upd .lastname").innerHTML = "<input type='text' name='lastName' id='upd-lastname' class='text-field' value=" + lastName +">";
        document.querySelector(".tab-upd .phone").innerHTML = "<input type='number' name='phoneNumber' id='upd-phone' class='text-field' value="+ phone +">";
        document.querySelector(".tab-upd .street").innerHTML = "<input type='text' name='street' id='upd-street' class='text-field' value="+ street +">";
        document.querySelector(".tab-upd .building").innerHTML = "<input type='text' name='buildingNum' id='upd-building' class='text-field' value=" + building +">";
        document.querySelector(".tab-upd .postal-code").innerHTML = "<input type='text' name='postal' id='upd-postal-code' class='text-field' value=" + postalCode +">";
        document.querySelector(".tab-upd .city").innerHTML = "<input type='text' name='city' id='upd-city' class='text-field' value=" + city + ">";
        document.querySelector(".tab-upd .country").innerHTML = "<input list='browser-country' name='country' id='upd-country' class='text-field' value=" + country + ">";

    }



    // add user to pass to php
    async updateUser() {

        let authUserID = localStorage.getItem("userID");

        let email = document.querySelector("#upd-email").value;
        let password = document.querySelector("#upd-password").value;
        let firstname = document.querySelector("#upd-firstname").value;
        let lastname = document.querySelector("#upd-lastname").value;
        let phone = document.querySelector("#upd-phone").value;
        let street = document.querySelector("#upd-street").value;
        let buildingNumber = document.querySelector("#upd-building").value;
        let postalCode = document.querySelector("#upd-postal-code").value;
        let city = document.querySelector("#upd-city").value;
        let country = document.querySelector("#upd-country").value;

        const updatedUser = { authUserID, email, password, firstname, lastname, phone, street, buildingNumber, postalCode, city, country};
        console.log(updatedUser);
        const response = await fetch("http://localhost:3000//backend/login.php?action=updateUser", {
            method: "POST",
            body: JSON.stringify(updatedUser)
        });

        //fetch the response
        const userData = await response.json();
        console.log(userData);

        // success redirect to #/profile
        let updateSuccess = userData.updateUser;

        if(updateSuccess == true) {
            router.navigateTo('#/profile');
            alert('Your information is updated');
            window.location.reload();  

        }
    }
    
}

export default UpdateUserPage;