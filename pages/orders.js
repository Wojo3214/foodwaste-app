import Router from "../src/router.js";
import { hideNav } from "../src/router.js";

class OrderPage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        this.attachEvents();
        hideNav();
    }

    render(){
        this.domElement.innerHTML += 
        /*html*/`
        <section id="orders" class="page">
            <h1 class="padding--bottom--sm">Your product list</h1>
            <div class="tab-menu-container">
                <button id="tabmenuLeft" class="tabmenu tabmenu--active" onclick="switchTabs('tabmenuLeft', 'ordered-food')">Orders</button>
                <button id="tabmenuRight" class="tabmenu" onclick="switchTabs('tabmenuRight', 'food-shared')">Shared</button>
            </div>

            <div id="ordered-food" class="tab-content"> 
                <div class="ordered-food container margin--top--sm">
                    <div class="ordered-header content--horizontal flex--wrap align--center space--between">
                        <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                            <img class="small--photo" src="src/img/avatar.svg">
                            <h3 class="text--bold">Wojo</h3>
                        </div>
                        <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                            <p>06.12.2021</p>
                            <p>15:00</p>
                        </div>
                    </div>
                    <div class="ordered-food-item container">
                        <div class="item-info">
                            <div class="content--horizontal flex--wrap flex--gap space--between">
                                <h3 class="padding--top--xs text--bold">Banana</h3>
                                <div class="content--horizontal flex--wrap padding--top--xs">
                                    <p class="food-amount">2</p>
                                    <p class="unit">stk</p>
                                </div>
                            </div>
                            <p class="pick-address padding--top--xs padding--bottom--xs">Haslegarsvej 24A</p>
                        </div>
                        <div class="btn--delete delete-item">
                            <i class="delete-icon" data-feather="trash"></i>
                        </div>
                    </div>
                    <button class="btn btn--small btn--cancel content--centered">Cancel</button>
                </div>
                
            </div>

            <div id="food-shared" class="tab-content" style="display:none;">
            <div class="shared-food container margin--top--sm">
                    <div class="shared-header content--horizontal flex--wrap align--center space--between">
                        <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                            <img class="small--photo" src="src/img/avatar.svg">
                            <h3 class="text--bold">Wojo</h3>
                        </div>
                        <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                            <p>06.12.2021</p>
                            <p>15:00</p>
                        </div>
                    </div>
                    <p class="padding--bottom--xs">Would like to get from you:</p>
                    <div class="shared-food-item container">
                        <div class="item-info shared-food-container">
                            <div class="content--horizontal flex--wrap flex--gap space--between">
                                <h3 class="padding--top--xs text--bold">Banana</h3>
                                <div class="content--horizontal flex--wrap padding--top--xs">
                                    <p class="food-amount">2</p>
                                    <p class="unit">stk</p>
                                </div>
                            </div>
                            <p class="pick-address padding--top--xs padding--bottom--xs">Haslegarsvej 24A</p>
                        </div>
                    </div>
                    <div class="order-accepted container--green margin--top--sm padding--top--xs">
                        <i class="check-mark text--green text--med-bold" data-feather="check"></i>
                        <p class="confirmation-text text--green text--med-bold">You accepted the order</p>
                        <p class="cancel-text padding--bottom--xs">If you want to cancel it, you have:<span class="text--semi-bold"> 30min</span></p>
                    </div>
                    <button class="btn btn--small btn--cancel content--centered">X Cancel the order</button>
                </div>
            </div>
        </section>
        `;
    } 
    attachEvents(){
        window.switchTabs = (tabID, tabContent) => this.switchTabs(tabID, tabContent);
    }

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
}

export default OrderPage;