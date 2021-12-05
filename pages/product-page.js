import MapBox from "../components/map.js";
import Router from "../src/router.js";

class ProductPage {
    constructor(domElement){
        this.domElement = domElement;
        this.mapBox = new MapBox("productMap");
        this.render();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="product" class="page">
            <div class="product-header">
                <button class="back-button--absolute"><i data-feather="arrow-left"></i></button>
                <img class="product-image" src="src/img/product.png">
            </div>
            <div class="profile-content">
                <h1 class="profile-username padding--top--md text--left">Mint</h1>

                <h2 class="padding--bottom--sx sub-heading ">Description</h2>
                <p>Mint in a very good condition, used only once and bought yesterday.</p>
                <div class="content--horizontal margin--top--md gap--8px">
                    <p class="text--semi-bold ">Expiriting date:</p>
                    <p>20.12.2021</p>
                </div>
                <div class="content--horizontal margin--top--sm gap--8px">
                    <p class="text--semi-bold ">Prefered Pick-up Time:</p>
                    <p>15:00-17:00</p>
                </div>

                <div class="margin--top--md user-banner">
                    <img src="../src/img/avatar.svg" class="profile-pic--small">
                    <p>Tom Ellis</p>
                    <div class="content--horizontal align--center">
                        <div class="stars-outer">
                            <div class="stars-inner"></div>
                        </div>
                        <h2 class="total-rating"></h2>
                    </div>
                </div>

                <h2 class="padding--top--md padding--bottom--sx  sub-heading">Pick-up location</h2>
                <p>Pottemagertoften 6</p>
                ${this.mapBox.render()}

                <div class="btns-container btns-container--vertical">
                    <input type="button" value="Book" class="btn btn--primary btn--normal">
                </div>  

                </div>
            </div>
            
        </section>
        `;
        this.mapBox.init();
        this.iconsInit();
        
    } 
    iconsInit(){
        feather.replace();
    }
}

export default ProductPage;