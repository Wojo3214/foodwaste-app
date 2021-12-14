import MapBox from "../components/map.js";
import router from "../src/router.js";
import ProductPage from "./product-page.js";

class HomePage {
    constructor(domElement){
        this.domElement = domElement;
        this.mapBox = new MapBox("map");
        this.render();
        this.attachEvents();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="home" class="page">
            <div class="tab-menu-container">
                <button id="tabmenu1" class="tabmenu tabmenu--active" onclick="switchTabs('tabmenu1', 'map-container')">Map</button>
                <button id="tabmenu2" class="tabmenu" onclick="switchTabs('tabmenu2', 'food-list')">List</button>
            </div>
            <div class="filters-menu-container">
                <button id="filter" class="filter"><i data-feather="search" class="icon-medium"></i></button>
                <button id="filter" class="filter"><i data-feather="filter" class="icon-medium"></i></button>
                <button id="filter" class="filter">Sort by: Nearest</button>
                <button id="filter" class="filter">Category: Vegetarian</button>
            </div>
            <div id="map-container" class="tab-content"> 
                ${this.mapBox.render()}
                <div class="carousel-slider">
                </div>
            </div> 
            <div id="food-list" class="tab-content" style="display:none;">
                <div class="food-sharing-area">
                </div>
            </div>
        </section>
        `;

        this.mapBox.init();
        this.iconsInit();
        this.getFoodProducts();
    }

    attachEvents(){
        window.switchTabs = (tabID, tabContent) => this.switchTabs(tabID, tabContent);
        window.getProductPage = (productID, sellerID) => this.getProductPage(productID, sellerID);
    }

    //Functionality for the Tabs chaning on Home Page -> MAP|LIST
    switchTabs(tabID, tabContent){
        const tabsContent = document.getElementsByClassName("tab-content");
        let i;

        for(i=0; i < tabsContent.length; i++){
            tabsContent[i].style.display = "none";
        }

        document.getElementById(tabContent).style.display = "block";

        const tabsMenu = document.getElementsByClassName("tabmenu");

        for(i=0; i < tabsMenu.length; i++){
            tabsMenu[i].className = "tabmenu";
        }

        document.getElementById(tabID).className = "tabmenu tabmenu--active";
    }

    async getFoodProducts(){
        let authUserID = localStorage.getItem("userID");
        let user = {userID : authUserID};
        
        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=getFoodProducts",{
            method: "POST",
            body: JSON.stringify(user)
        });

        const data = await response.json();
        console.log(data);

        let foodItems = data.foodData;
        let foodItemTemplate = "";
        let foodItemTemplateSlider = "";
        
        for (const item of foodItems) {
            foodItemTemplateSlider += /*html*/`
                <div class="carousel-slider-item" onclick="getProductPage(${item.PK_foodID},${item.userID})">
                    <img src="${item.foodImg}" alt="Food product image">
                    <div class="carousel-slider-details">
                        <p>${item.foodName}</p>
                        <span><i data-feather="map-pin" class="map-pin icon-small"></i> 0,5km</span>
                    </div>
                </div>
            `;
        }
        
        document.querySelector(".carousel-slider").innerHTML = foodItemTemplateSlider;

        for (const item of foodItems) {
            let fromTime = item.fromTime;
            let untilTime = item.untilTime;
            let time = fromTime.substring(0, fromTime.length-3) + ' - ' + untilTime.substring(0, untilTime.length-3);

            foodItemTemplate += /*html*/`
            <div class="sharing-container container margin--bottom--sm" onclick="getProductPage(${item.PK_foodID},${item.userID})">
                <img class="food-thumbnail" src="${item.foodImg}">
                <div class="food-header content--horizontal flex--wrap space--between">
                    <h3 class="text--bold">${item.foodName}</h3>
                    <div class="food-details content--horizontal">
                        <p class="food-amount">${item.amount}</p>
                        <p class="unit">${item.unit}</p>
                    </div>
                </div>
                <p class="pick-time">${time}</p>
                <p class="pick-address">${item.pickUpAddress}</p>
            </div>
            `;
        }
        
        document.querySelector(".food-sharing-area").innerHTML = foodItemTemplate;
    }

    getProductPage(productID, sellerID) {
        sessionStorage.setItem("productID",productID);
        sessionStorage.setItem("sellerID",sellerID);
        router.navigateTo("#/product");
        location.reload();
    }

    iconsInit(){
        feather.replace();
    }
    
}

export default HomePage;