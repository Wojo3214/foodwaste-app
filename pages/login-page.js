import router from "../src/router.js";

class LoginPage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        this.attachEvents();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="login" class="page page--centered">
            <img src="./src/img/logo.svg" class="logo" alt="Logo">
            <h1>Good to see you back!</h1>
            <form action="loginUser" method="POST">
                <label class="input-label">Email
                <input type="email" name="mail" id="mail" class="text-field" placeholder="Your email">
                </label>
                <label class="input-label">Password
                <input type="password" name="password" id="pass" class="text-field" placeholder="Your password">
                </label>
                <!-- <a href="" class="link padding--top--sm ">Forgot my password</a> -->

                <p class="text--centered padding--top--md">If you are not a part of the RawShare yet,<br><a href="#/signup" class="paragraph-link">Create an account</a>.</p>

                <div class="btns-container btns-container--vertical padding--top--md">
                    <input type="button" onclick="login()" value="Log in" class="btn btn--primary btn--normal">
                </div>  
            </form> 
        </section>
        `;
    }
    
    attachEvents(){
        window.login = () => this.login();
    }

    async login() {
        let email = document.getElementById('mail').value;
        let password = document.getElementById('pass').value;
        const loginObject = { email: email, password: password };
        const response = await fetch("http://localhost:3000//backend/login.php?action=loginUser", {
            method: "POST",
            body: JSON.stringify(loginObject)
        });
        
        const data = await response.json();
        

        if (data.authenticated) {
            localStorage.setItem("userIsAuthenticated", true);
            localStorage.setItem("authUser", JSON.stringify(data.userData));
            
            router.navigateTo("#/home");
            location.reload();

            localStorage.setItem("userID",data.userData.PK_id);
            localStorage.setItem("firstName",data.userData.firstName);
            localStorage.setItem("lastName",data.userData.lastName);
            localStorage.setItem("profileImg",data.userData.profileImg);
            localStorage.setItem("address",data.userData.street + data.userData.buildingNum);
            localStorage.setItem("email",data.userData.email);
            localStorage.setItem("password",data.userData.userPassword);
            localStorage.setItem("phone",data.userData.phoneNumber);
            localStorage.setItem("street",data.userData.street);
            localStorage.setItem("building",data.userData.buildingNum);
            localStorage.setItem("postalCode",data.userData.postalCode);
            localStorage.setItem("city",data.userData.city);
            localStorage.setItem("country",data.userData.country);
        }
    }
}

export default LoginPage;
