import router from "../src/router.js";

class AddItemPage {
    constructor(domElement){
        this.domElement = domElement;
        this.currentTab = 0;
        this.render();
        this.showTabs(this.currentTab);
        this.getCurrentDate();
        this.attachEvents();
        this.previewFile();
        // this.addEvent();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="add" class="page page--centered">
            <header class="form-header">
                <h1>Add new product</h1>
            </header>
            
            <form id="add-form" class="add-form" enctype="multipart/form-data">
                <!-- <div class="progress-bar">
                    <div class="bar"></div>
                </div> -->
                <div class="tab">
                    <label class="input-label">Product name
                        <input type="text" id="food-name" name="product-name" class="text-field" placeholder="E.g. Apple" oninput="this.className = ''">
                    </label>
                    <label class="input-label">Food type
                        <select name="food-type" id="food-type" class="text-field">
                            <option selected disabled>Choose one</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="fruits">Fruits</option>
                            <option value="meat">Meat</option>
                            <option value="vegan">Vegan</option>
                            <option value="vegetarian">Vegetarian</option>
                        </select>
                    </label>
                    <label class="input-label">Product description
                        <textarea name="product-desc" id="food-desc" oninput="this.className = ''"></textarea>
                    </label>
                    <label class="input-label">Expiration date
                        <input type="date" name="product-name" id="expiration-date" class="text-field" oninput="this.className = ''">
                    </label>
                    <div class="content--horizontal quantity">
                        <label class="input-label">Amount
                            <input type="number" name="amount" id="product-amount" class="text-field">
                        </label>
                        <label class="input-label">Unit
                        <select name="food-unit" id="food-unit" class="text-field">
                            <option selected disabled>Choose one</option>
                            <option value="stk">stk</option>
                            <option value="kg">kg</option>
                            <option value="dag">dag</option>
                            <option value="g">g</option>
                            <option value="l">l</option>
                            <option value="ml">ml</option>
                        </select>
                    </label>
                    </div>
                </div>
                <div class="tab">
                    <label class="input-label">Add image
                        <input type="file" name="image" id="food-image" onchange="previewFile()" class="file-field" accept="image/png, image/jpeg">
                    </label>
                    <img id="img-preview" src="" height="200">
                    <!-- <label for="image" class="get-file-input">
                        <i data-feather="plus" class="plus--black"></i>
                    </label> -->
                </div>
                <div class="tab">
                    <div class="content--horizontal">
                        <label class="input-label">From
                            <input type="time" name="time-from" id="food-time-from" class="text-field" step="900">
                        </label>
                        <label class="input-label">To
                            <input type="time" name="time-to" id="food-time-to" class="text-field" step="900">
                        </label>
                    </div>
                    <label class="input-label">Pick up address
                            <input type="text" name="address" id="food-address" class="text-field" placeholder="E.g Sejrogade 24E, Aarhus C">
                    </label>
                </div>
                <div id="overview" class="tab">
                </div>
            </form>
            
            <div class="btns-container btns-container--horizontal">
                <input type="button" value="Back" class="btn btn--secondary btn--normal prev-btn" onclick="nextPrevAdd(-1)">
                <input type="button" value="Next" class="btn btn--primary btn--normal next-btn" onclick="nextPrevAdd(1)">
                <input type="button" value="Finish" class="btn btn--primary btn--normal finish-btn" onclick="addFoodItems()">
            </div>  
        </section>
        `;
        this.iconsInit();
        
        document.querySelector("#add .finish-btn").style.display = "none";
        
    }

    // preview for the uploaded image
    previewFile() {
        var preview = document.querySelector('#img-preview');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
        }
      
        if (file) {
          reader.readAsDataURL(file);
        } else {
          preview.src = "";
        }
    }

    attachEvents(){
        window.nextPrevAdd = (tabNum) => this.nextPrev(tabNum);
        window.shareOverview = () => this.shareOverview();
        window.addFoodItems = () => this.addFoodItems();
        window.previewFile = () => this.previewFile();
    }

    showTabs(n){
        //this function will display the specified tab in the form
        let tabs = document.querySelectorAll("#add .tab");
        tabs[n].style.display = "block";

        if(n == 0){
            document.querySelector("#add .prev-btn").style.display = "none";
            document.querySelector("#add .finish-btn").style.display = "none";
            document.querySelector("#add .next-btn").style.display = "block";
        } else {
            document.querySelector("#add .prev-btn").style.display = "block";
            document.querySelector("#add .finish-btn").style.display = "none";
            document.querySelector("#add .next-btn").style.display = "block";
        }

        if(n == (tabs.length - 2)){
            document.querySelector("#add .next-btn").style.display = "block";
            document.querySelector("#add .next-btn").addEventListener("click", this.shareOverview);
        }

        if(n == (tabs.length - 1)){
            document.querySelector("#add .next-btn").style.display = "none";
            document.querySelector("#add .finish-btn").style.display = "block";
        } else {
            document.querySelector("#add .next-btn").value = "Next";
        }

        //progressBar function
        //this.progressBar(n);
    }

    nextPrev(n){
        let tabs = document.querySelectorAll("#add .tab");
        //if(n == 1 && !this.validateForm()) return false;
        tabs[this.currentTab].style.display = "none";
        this.currentTab = this.currentTab + n;
        if(this.currentTab >= tabs.length){
            console.log("Form is sent!");
            // document.getElementById("add-form").submit();
            document.querySelector("#add .next-btn").href = "#/home";
            return false;
        } 
        
        this.showTabs(this.currentTab);
    }

    validateForm(){
        let tabs, y, i, valid = true;
        tabs = document.querySelector("#add .tab")
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
    
    //Function displays all put information about new food item
    shareOverview(){
        const productName = document.querySelector("#food-name").value;
        const foodType = document.querySelector("#food-type").value;
        const foodDesc = document.querySelector("#food-desc").value;
        const foodExpirationDate = document.querySelector("#expiration-date").value;
        const foodAmount = document.querySelector("#product-amount").value;
        const foodUnit= document.querySelector("#food-unit").value;
        const foodImg = document.querySelector("#img-preview").value;
        const pickUpTimeFrom = document.querySelector("#food-time-from").value;
        const pickUpTimeTo = document.querySelector("#food-time-to").value;
        const foodAddress = document.querySelector("#food-address").value;

        let overviewTemplate = `
            <header>
                <h2>Overview</h2>
            </header>
            <div class="overview-container">
                <p class="overview-list-header text--bold">Product name</p>
                <p>${productName}</p>
                <p class="overview-list-header text--bold">Food type</p>
                <p>${foodType}</p>
                <p class="overview-list-header text--bold">Quantity</p>
                <p>${foodAmount} ${foodUnit}</p>
                <p class="overview-list-header text--bold">Description</p>
                <p>${foodDesc}</p>
                <p class="overview-list-header text--bold">Expiration Date</p>
                <p>${foodExpirationDate}</p>
                <p class="overview-list-header text--bold">Prefered pick up time</p>
                <p>${pickUpTimeFrom} - ${pickUpTimeTo}</p>
                <p class="overview-list-header text--bold">Pick up address</p>
                <p>${foodAddress}</p>
            </div>
        `;
        document.getElementById("overview").innerHTML = overviewTemplate;
    }

    //Function gets current date to enable users to choose expiration date starting from today
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

        document.querySelector("#expiration-date").setAttribute("min", date);
        document.querySelector("#expiration-date").value=date;
    }

    iconsInit(){
        feather.replace();
    }

    async savePhoto() {
        let foodImg = document.querySelector('input[type=file]').files[0];

        const foodPhoto = { foodImg };
        console.log(foodPhoto);
        const response = await fetch("http://localhost:3000//backend/fileUpload.php?action=upload", {
            method: "POST",
            enctype: "multipart/form-data",
            body: JSON.stringify(foodPhoto)
        });

        const imgAdded = await response.text();
        console.log(imgAdded);
    }

    // creating a json to pass to backend
    async addFoodItems() {

        this.savePhoto();

        let foodName = document.querySelector("#food-name").value;
        let foodType = document.querySelector("#food-type").value;
        let foodDescription = document.querySelector("#food-desc").value;
        let foodExpirationDate = document.querySelector("#expiration-date").value;
        let foodAmount = document.querySelector("#product-amount").value;
        let foodUnit = document.querySelector("#food-unit").value;
        let foodImg = document.querySelector('input[type=file]').files[0].name;
        let pickUpTimeFrom = document.querySelector("#food-time-from").value;
        let pickUpTimeTo = document.querySelector("#food-time-to").value;
        let foodAddress = document.querySelector("#food-address").value;

        const FoodItemObject = { foodName, foodDescription, foodAmount, foodUnit, foodImg, foodType, foodExpirationDate, pickUpTimeFrom, pickUpTimeTo, foodAddress };
        console.log(FoodItemObject);
        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=addFoodItems", {
            method: "POST",
            body: JSON.stringify(FoodItemObject)
        });

        //fetch the response
        const foodData = await response.json();
        console.log(foodData);

        // success redirect to #/home
        let addSuccess = foodData.addItemSuccess;

        if(addSuccess == true) {
            alert('New food item is added. You can see your food items in the profile');
            router.navigateTo('#/home');
        }
        else {
            alert('Please fill out all fields');
        }
    }

   


    // goBack(){
    //     window.history.back();
    // }

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

export default AddItemPage;