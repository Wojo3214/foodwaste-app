import MapBox from "../components/map.js";
import router from "../src/router.js";

class HomePage {
    constructor(domElement){
        this.domElement = domElement;
        this.mapBox = new MapBox("map");
        this.render();
        this.attachEvents();
        //this.getFoodProducts();
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
                    <div class="carousel-slider-item">
                        <img src="https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Food product image">
                        <div class="carousel-slider-details">
                            <p>Pizza</p>
                            <span><i data-feather="map-pin" class="map-pin icon-small"></i> 1km</span>
                        </div>
                    </div>
                    <div class="carousel-slider-item">
                        <img src="../src/img/product.png" alt="Food product image">
                        <div class="carousel-slider-details">
                            <p>Mint</p>
                            <span><i data-feather="map-pin" class="map-pin icon-small"></i> 0,5km</span>
                        </div>
                    </div>
                    <div class="carousel-slider-item">
                        <img src="https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Food product image">
                        <div class="carousel-slider-details">
                            <p>Mint</p>
                            <span><i data-feather="map-pin" class="map-pin icon-small"></i> Haslegardsvej 24A</span>
                        </div>
                    </div>
                    <div class="carousel-slider-item">
                        <img src="https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Food product image">
                        <div class="carousel-slider-details">
                            <p>Mint</p>
                            <span><i data-feather="map-pin" class="map-pin icon-small"></i> Haslegardsvej 24A</span>
                        </div>
                    </div>
                    <div class="carousel-slider-item">
                        <img src="https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Food product image">
                        <div class="carousel-slider-details">
                            <p>Mint</p>
                            <span><i data-feather="map-pin" class="map-pin icon-small"></i> Haslegardsvej 24A</span>
                        </div>
                    </div>
                    <div class="carousel-slider-item">
                        <img src="https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Food product image">
                        <div class="carousel-slider-details">
                            <p>Mint</p>
                            <span><i data-feather="map-pin" class="map-pin icon-small"></i> Haslegardsvej 24A</span>
                        </div>
                    </div>
                </div>
            </div> 
            <div id="food-list" class="tab-content" style="display:none;">
                <div class="food-sharing-area">
                    <div class="sharing-container">
                        <img class="food-thumbnail" src="../src/foodImg/placeholder/placeholder.png">
                        <h3 class="food-header">Cherries</h3>
                        <p class="pick-time">8:00 - 12:00</p>
                        <p class="pick-address">3 km</p>
                        <p class="food-amount">3stars</p>
                        <p class="unit">stk</p>
                    </div>
                </div>
            </div>
        </section>
        `;
        this.mapBox.init();
        this.iconsInit();
        //this.getFoodProducts();
    }

    attachEvents(){
        window.switchTabs = (tabID, tabContent) => this.switchTabs(tabID, tabContent);
        //window.getFoodProducts = () => this.getFoodProducts();
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
        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=getFoodProducts");

        const data = await response.json();
        console.log(data);
        console.log(data.foodData.foodName);
    }

    iconsInit(){
        feather.replace();
    }
}

export default HomePage;