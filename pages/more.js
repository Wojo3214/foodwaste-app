import router from "../src/router.js";

class MorePage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="more" class="page">
            <h1 class="padding--bottom--md">Explore</h1>    
            <a href="#" class="settings-heading">
                <h3>About Food Waste</h3>
            </a>
            <a href="#" class="settings-heading">
                <h3>Tips & Tricks</h3>
            </a>
            <a href="#" class="settings-heading">
                <h3>Articles</h3>
            </a> 
            <a href="#" class="settings-heading">
                <h3>Blog</h3>
            </a>     
        </section>
        `;

        this.init();
    } 

    init(){
        feather.replace();
    }
}

export default MorePage;