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
                <a href="#" class="back-button"></a>
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
                        <h2 class="rating-sum"></h2>
                    </div>
                </div>
                <div class="user-reviews"></div>
            </div>
        </section>
        `;

        this.mapBox.init();
        this.init();
        this.getFoodProducts();
        this.getData();
        this.getReviews();
        
    } 

    init(){
        feather.replace();
    }
    
    async getData(){
        let authUserID = localStorage.getItem("userID");
        let userInfo = {userID : authUserID};

        const response = await fetch("http://localhost:3000//backend/login.php?action=getUserData",{
            method: "POST",
            body: JSON.stringify(userInfo)
        });

        const data = await response.json();
        let userData = data.userProfileData[0];


        let firstName = userData.firstName;
        let lastName = userData.lastName;
        let address = userData.street + ' ' + userData.buildingNum;
        let profileImg = userData.profileImg;
        
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
        let userProfile = {userID : authUserID};

        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=getFoodProductsProfile",{
            method: "POST",
            body: JSON.stringify(userProfile)
        });

        const data = await response.json();

        let foodItems = data.foodProfileData;
        let foodItemTemplate = "";
        
        for (const item of foodItems) {
            if(item.userID == authUserID) {
                let fromTime = item.fromTime;
                let untilTime = item.untilTime;
                let time = fromTime.substring(0, fromTime.length-3) + ' - ' + untilTime.substring(0, untilTime.length-3);

                foodItemTemplate += /*html*/`
                    <div class="sharing-container container margin--bottom--sm" onclick="getProductPage(${item.PK_foodID})">
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
        }
        
        document.querySelector(".profile-shared-container").innerHTML = foodItemTemplate;
    }

    async getReviews(){
        let authUserID = localStorage.getItem("userID");

        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=getReviews");

        const data = await response.json();

        let reviewItems = data.reviewData;
        let reviewItemTemplate = "";
        
        for (const item of reviewItems) {
            if(item.receiverID == authUserID) {
                reviewItemTemplate += /*html*/`
                <div class="review-container">
                    <div class="review-header content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                        <img class="small--photo" src="${item.profileImg}">
                        <h3>${item.firstName} ${item.lastName}</h3>
                    </div>
                    <div class="padding--bottom--sm content--horizontal">
                        <div class="star-full"></div>
                        <span class="rating">${item.rating}</span>
                    </div>
                    <h2 class="padding--bottom--sm text--med-bold">${item.header}</h2>
                    <p>${item.review}</p>
                </div>
                `;
            }
        }
        
        document.querySelector(".user-reviews").innerHTML = reviewItemTemplate;

        // use avatar for the review photo if profile photo is empty
        let reviewImg = document.querySelectorAll(".small--photo");

        for(const img of reviewImg) {
            if(img.src == "http://localhost:3000/") {
                //console.log("empty");
                img.src = "../src/img/avatar.svg";
            }
        }
        
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
            document.querySelector('.total-rating').innerHTML = avgRating.toFixed(1) ;
            document.querySelector('.rating-sum').innerHTML = '&nbsp;(' + ratingArray.length + ')';
           
        });
        
        // calculating % of the total score and displaying it in stars
        let totalRating = document.querySelector(".total-rating").innerHTML;
        let starPercentage = (totalRating / 0.1) * 2;
        let starPercentageRounded = Math.round(starPercentage / 10) * 10;
        document.querySelector('.stars-inner').style.width = starPercentageRounded + '%'; 
    }
}

export default ProfilePage;