import router from "../src/router.js";

class SettingsPage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        this.attachEvents();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="settings" class="page">
            <div class="settings-header">
                <button class="back-button--normal"><a href="#/profile"><i data-feather="arrow-left"></i></a></button>
                <h2>Settings</h2>
            </div>
            <a href="#/update" class="settings-heading">
                <h3>Personal Information</h3>
            </a>
            <div class="settings-heading">
                <h3>Push Notifications</h3>
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider round"></span>
                </label>
            </div>
            <a href="#" class="settings-heading">
                <h3>Terms & Conditions</h3>
            </a>
            <a class="settings-heading" onclick="logOut()">
                <h3>Log Out</h3>
            </a>
        </section>
        `;
        this.iconsInit();
        
    } 

    attachEvents(){
        window.logOut = () => this.logOut();
    }

    logOut() {
        //reset localStorage
        sessionStorage.clear();
        localStorage.clear();
        localStorage.removeItem("userIsAuthenticated");
        localStorage.removeItem("authUser");
        //navigate to login
        router.navigateTo("#/login");
    }
    
    iconsInit(){
        feather.replace();
    }
}

export default SettingsPage;