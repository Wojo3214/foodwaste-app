import router from "../src/router.js";

class BookingPage {
    constructor(domElement){
        this.domElement = domElement;
        this.currentTab = 0;
        this.render();
        this.showTabs(this.currentTab);
        this.attachEvents();
        this.getChosenContent(this.productID);
        this.getChosenProduct(this.productID);
        this.getCurrentDate();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="booking" class="page page--centered">
            <div class="tab">
                <header class="booking-header">
                    <button class="back-button--normal"><a href="#/profile"><i data-feather="arrow-left"></i></a></button>
                    <h2>Your product list</h2>
                </header>
                <div class="choosen-products-container">
                </div>
                <h3>Other products of User</h3>
                <div class="carousel-slider carousel-slider--relative">
                </div>
            </div>
            <div class="tab">
                <header class="settings-header">
                    <h2>Pick up details</h2>
                </header>
                <form>
                    <label class="input-label">Date of pick up
                        <input type="date" name="product-name" id="pickup-date" class="text-field" oninput="this.className = ''">
                    </label>
                    <label class="input-label">Time
                        <input type="time" name="time-to" id="pickup-time" class="text-field" step="900">
                    </label>
                    <div class="hour-info">
                        <i data-feather="alert-circle" class="alert-circle"></i>
                        <p>You chose a pick-up <b>time which is not preffered by the seller</b>. We want to aware you that your order may be rejected due to this fact. Please, contact with the seller later on.</p>
                    </div>
                </form>
            </div>
            <div class="btns-container btns-container--horizontal">
                <input type="button" value="Back" class="btn btn--secondary btn--normal prev-btn" onclick="nextPrevBook(-1)">
                <input type="button" value="Next" class="btn btn--primary btn--normal next-btn" onclick="nextPrevBook(1)">
            </div>
        </section>`;

        this.iconsInit();
    }

    attachEvents(){
        window.nextPrevBook = (tabNum) => this.nextPrev(tabNum);
    }

    showTabs(n){
        //this function will display the specified tab in the form
        let tabs = document.querySelectorAll("#booking .tab");
        tabs[n].style.display = "block";
        console.log(tabs[n]);

        if(n == 0){
            document.querySelector("#booking .prev-btn").style.display = "none";
        } else {
            document.querySelector("#booking .prev-btn").style.display = "block";
        }

        if(n == (tabs.length - 2)){
            document.querySelector("#booking .next-btn").addEventListener("click", this.shareOverview);
        }

        if(n == (tabs.length - 1)){
            document.querySelector("#booking .next-btn").type = 'submit';
            document.querySelector("#booking .next-btn").value = "Finish";
            document.querySelector("#booking .next-btn").href = "#/home";
            document.querySelector("#booking .next-btn").addEventListener("click", this.CreateOrder);
        } else {
            document.querySelector("#booking .next-btn").value = "Next";
        }
    }

    nextPrev(n){
        let tabs = document.querySelectorAll("#booking .tab");
        tabs[this.currentTab].style.display = "none";
        this.currentTab = this.currentTab + n;
        if(this.currentTab >= tabs.length){
            console.log("Form is sent!");
            router.navigateTo('#/home');
            return false;
        } 
        
        this.showTabs(this.currentTab);
    }

    validateForm(){
        let tabs, y, i, valid = true;
        tabs = document.querySelector("#booking .tab")
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

    getCurrentDate(){
        let today = new Date();
        let yyyy = today.getFullYear();
        let mm = today.getMonth()+1;
        let dd;
        if(today.getDate()<10){
            dd = "0"+today.getDate();
        } else{
            dd = today.getDate();
        }
        let date = yyyy + "-" + mm + "-" + dd;

        document.querySelector("#pickup-date").setAttribute("min", date);
        document.querySelector("#pickup-date").value=date;
    }

    async getChosenProduct(productID){
        let specificProductID = sessionStorage.getItem("productID",productID); 

        let product = {productId : specificProductID};
        console.log(product);

        const response = await fetch('http://localhost:3000//backend/foodproducts.php?action=getChosenProduct', {
            method: "POST",
            body: JSON.stringify(product)
        });

        const data = await response.json();
        let productObject = data.productData;
        console.log(productObject);

        let productTemplate = "";
        
        for (const item of productObject) {
            productTemplate += /*html*/`
                <div class="choosen-food-item container">
                    <div class="item-info">
                        <div class="flex--wrap flex--gap space--between">
                            <h3 class="padding--top--xs text--bold">${item.foodName}</h3>
                            <div class="content--horizontal flex--wrap padding--top--xs">
                                <p class="food-amount">${item.amount}</p>
                                <p class="unit">${item.unit}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        this.iconsInit();
        document.querySelector(".choosen-products-container").innerHTML += productTemplate;
    }


    async getChosenContent(productID, sellerID){
        let specificProductID = sessionStorage.getItem("productID",productID); 
        let specificSellerID = sessionStorage.getItem("sellerID",sellerID); 
        let specificBuyerID = localStorage.getItem("userID",sellerID); 

        let product = {productId : specificProductID, sellerID : specificSellerID, buyerID : specificBuyerID};
        console.log(product);

        const response = await fetch('http://localhost:3000//backend/foodproducts.php?action=getChosenContent', {
            method: "POST",
            body: JSON.stringify(product)
        });

        let data = await response.json();
        let productObject = data.productsData;
        console.log(productObject);

        let productTemplate = "";
        
        for (const item of productObject) {
            productTemplate += /*html*/`
                <div class="carousel-slider-item">
                    <img src="${item.foodImg}" alt="Food product image">
                    <div class="carousel-slider-details">
                        <p>${item.foodName}</p>
                        <span><i data-feather="map-pin" class="map-pin icon-small"></i> 0,5km</span>
                    </div>
                </div>
            `;
        }
        
        this.iconsInit();
        document.querySelector(".carousel-slider--relative").innerHTML += productTemplate;
    }

    async CreateOrder() {
        let productID = sessionStorage.getItem("productID");
        let buyer = localStorage.getItem("userID");
        let seller = sessionStorage.getItem("sellerID");
        let pickUpDate = document.querySelector("#pickup-date").value;
        let pickUpTime = document.querySelector("#pickup-time").value;

        const orderObject = { productID, buyer, seller, pickUpDate, pickUpTime };
        console.log(orderObject);
        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=createOrder", {
            method: "POST",
            body: JSON.stringify(orderObject)
        });

        //fetch the response
        const orderData = await response.json();
        console.log(orderData);

        let addSuccess = orderData.addOrder;

        if(addSuccess == true) {
            router.navigateTo('#/home');
            document.querySelector("#order-dialog").style.display = "flex";
        }
        else {
            alert('Please fill out all fields');
        }
    }

    iconsInit(){
        feather.replace();
    }
}

export default BookingPage;