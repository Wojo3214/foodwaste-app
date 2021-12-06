import MapBox from "../components/map.js";
import Router from "../src/router.js";
import { hideNav } from "../src/router.js";

class ProfilePage {
    constructor(domElement){
        this.domElement = domElement;
        this.mapBox = new MapBox("profileMap");
        this.render();
        hideNav();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="profile" class="page">
            <div class="header">
                <a href="#" class="back-button"><i data-feather="arrow-left"></i></a>
                <img class="profile-image" src="src/img/avatar.svg">
                <a href="#/settings" class="settings-button"><i data-feather="settings"></i></a>
            </div>
            <h1 class="profile-username padding--top--md text--centered">Ana Smith</h1>
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
                <h2 class="padding--bottom--sm">Ana is sharing</h2>
                <div class="sharing-container container">
                    <img class="food-thumbnail" src="src/foodImg/placeholder/placeholder.png">
                    <h3 class="food-header text--bold">Cherries</h3>
                    <p class="pick-time">8:00 - 12:00</p>
                    <p class="pick-address">Pottemagertoften 6</p>
                    <p class="food-amount">2</p>
                    <p class="unit">stk</p>
                </div>
                <h2 class="padding--top--md padding--bottom--sm">Pick-up location</h2>
                <p>Pottemagertoften 6</p>
                ${this.mapBox.render()}

                <div class="total-review padding--top--md padding--bottom--sm content--horizontal space--between">
                    <h2>Reviews</h2>
                    <div class="content--horizontal align--center padding--bottom--sm">
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
                    <div class="padding--bottom--sm">
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
    } 
    init(){
        feather.replace();
    }
}

export default ProfilePage;