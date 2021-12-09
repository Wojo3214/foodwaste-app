import MapBox from "../components/map.js";
import router from "../src/router.js";

class ProfilePage {
    constructor(domElement){
        this.domElement = domElement;
        this.mapBox = new MapBox("profileMap");
        this.render();
        this.getData();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="profile" class="page">
            <div class="header">
                <a href="#" class="back-button"><i data-feather="arrow-left"></i></a>
                <div class="profile-image"></div>
                <a href="#/settings" class="settings-button"><i data-feather="settings"></i></a>
            </div>
            <h1 class="profile-username padding--top--md text--centered"></h1>
            <div class="profile-content">
                <div id="statistics" class="content--horizontal space--between padding--top--md">
                    <div class="statistics content--vertical padding--top--sm padding--bottom--sm">
                        <p class="statistics-header">Food Shared</p>
                        <h2 class="food-shared text--bold">05</h2>
                    </div>
                    <div class="statistics content--vertical padding--top--sm padding--bottom--sm">
                        <p class="statistics-header">Food Collected</p>
                        <h2 class="text--bold">12/14</h2>
                    </div>
                </div>
                <h2 class="person-sharing padding--bottom--sm"></h2>
                <div class="profile-shared-container">
                </div>
                <h2 class="padding--top--md padding--bottom--sm">Pick-up location</h2>
                <p class="address-street">/p>
                ${this.mapBox.render()}

                <div class="total-review padding--top--md content--horizontal space--between">
                    <h2>Reviews</h2>
                    <div class="content--horizontal align--center">
                        <div class="stars-outer">
                            <div class="stars-inner"></div>
                        </div>
                        <h2 class="total-rating"></h2>
                    </div>

                </div>

                <div class="review-container">
                    <div class="review-header content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                        <img class="small--photo" src="src/img/avatar.svg">
                        <h3>Michael Scott</h3>
                        <p>Exchange verified</p>
                    </div>
                    <div class="padding--bottom--sm content--horizontal">
                        <div class="star-full"></div>
                        <span class="rating">5</span>
                    </div>
                    <h2 class="padding--bottom--sm text--med-bold">Trustworthy user!</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adispiscing elit. Nam eu venenatis metus. Donec in lacus mauris.</p>
                </div>
            </div>
            
        </section>
        `;

        this.mapBox.init();

        



        //calculating avarage person's rating from all ratings
        let ratings = document.querySelectorAll('.rating');
        
        //creating the array
        let ratingArray = [];
        Array.from(ratings).forEach(function(el) {
            //pushing rating values to the array
            ratingArray.push(el.innerHTML);

            //declaring default sum to '0'
            var sum = 0;
            //loop through the array and convert to an integer
            for( var i = 0; i < ratingArray.length; i++ ){
                sum += parseInt( ratingArray[i], 10 );
            }
            //calculating the avarage
            var avgRating = sum/ratingArray.length;
            //render inhtml
            document.querySelector('.total-rating').innerHTML = avgRating.toFixed(1);
           
          });
        
        // calculating % of the total score and displaying it in stars
        let totalRating = document.querySelector(".total-rating").innerHTML;
        let starPercentage = (totalRating / 0.1) * 2;
        let starPercentageRounded = Math.round(starPercentage / 10) * 10;
        document.querySelector('.stars-inner').style.width = starPercentageRounded + '%'; 

        this.init();
        this.getFoodProducts();
        this.getData();

        

    } 

    init(){
        feather.replace();
    }
    

    getData(){
        let firstName = localStorage.getItem("firstName");
        let lastName = localStorage.getItem("lastName");
        let address = localStorage.getItem("address");
        let profileImg = localStorage.getItem("profileImg");
        let placeholder = "../src/img/avatar.svg";
        console.log(placeholder);
        console.log(profileImg);
        if(profileImg == "") {
            document.querySelector(".profile-image").innerHTML = "<img class='user-pic' src='../src/img/avatar.svg'></img>";
        }
        else {
            document.querySelector(".profile-image").innerHTML = "<img class='user-pic' src=" + profileImg + "></img>";
        }
        document.querySelector(".profile-username").innerHTML = firstName + " " + lastName;
        document.querySelector(".person-sharing").innerHTML = firstName + " is sharing";
        document.querySelector(".address-street").innerHTML = address;
        
    };

    async getFoodProducts(){
        let authUserID = localStorage.getItem("userID");
        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=getFoodProducts");

        const data = await response.json();

        let foodItems = data.foodData;
        let foodItemTemplate = "";
        
        for (const item of foodItems) {
            if(item.userID == authUserID) {
                foodItemTemplate += `
                    <div class="sharing-container container margin--bottom--sm" onclick="displayProduct(${item.PK_foodID})">
                        <img class="food-thumbnail" src="${item.foodImg}">
                        <div class="food-header content--horizontal flex--wrap space--between">
                            <h3 class="text--bold">${item.foodName}</h3>
                            <div class="food-details content--horizontal">
                                <p class="food-amount">${item.amount}</p>
                                <p class="unit">${item.unit}</p>
                            </div>
                        </div>
                        <p class="pick-time">${item.fromTime} - ${item.untilTime}</p>
                        <p class="pick-address">${item.pickAddress}</p>
                    </div>
                `;
            }
        }
        
        document.querySelector(".profile-shared-container").innerHTML = foodItemTemplate;
    }
}

export default ProfilePage;