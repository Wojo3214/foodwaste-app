import MapBox from "../components/map.js";
import router from "../src/router.js";

class ProductPage {
    constructor(domElement){
        this.domElement = domElement;
        this.mapBox = new MapBox("productMap");
        this.render();
        this.getProductContent(this.productID);
    }

    render(){
        this.domElement.innerHTML +=  /*html*/ `
        <section id="product" class="page">
        
        </section>
        `;
    }

    async getProductContent(productID){
        let specificProductID = sessionStorage.getItem("productID",productID);
        
        console.log(specificProductID);

        let product = {productId : specificProductID};

        const response = await fetch('http://localhost:3000//backend/foodproducts.php?action=getProductContent', {
            method: "POST",
            body: JSON.stringify(product)
        });

        const data = await response.json();
        let productObject = data.foodData;
        console.log(productObject);

        let productTemplate = "";
        
        for (const item of productObject) {
                productTemplate += /*html*/`
                    <div class="product-header">
                            <button class="back-button--absolute"><i data-feather="arrow-left"></i></button>
                            <img class="product-image" src="${item.foodImg}">
                    </div>
                        <div class="profile-content">
                            <h1 class="profile-username padding--top--md text--left">${item.foodName}</h1>

                            <h2 class="padding--bottom--sx sub-heading ">Description</h2>
                            <p>${item.foodDescription}</p>
                            <div class="content--horizontal margin--top--md gap--8px">
                                <p class="text--semi-bold ">Expiriting date:</p>
                                <p>${item.expirationDate}</p>
                            </div>
                            <div class="content--horizontal margin--top--xs gap--8px">
                                <p class="text--semi-bold ">Prefered Pick-up Time:</p>
                                <p>${item.fromTime} - ${item.untilTime}</p>
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
                            <p>${item.pickUpAddress}</p>
                            ${this.mapBox.render()}

                            <div class="btns-container btns-container--vertical">
                                <input type="button" value="Book" class="btn btn--primary btn--normal">
                            </div>  

                            </div>
                    </div>
            `;
        }
        
        this.mapBox.init();
        this.iconsInit();

        console.log(productTemplate);
        document.querySelector("#product").innerHTML += productTemplate;
        
    }

    iconsInit(){
        feather.replace();
    }
    
}

export default ProductPage;