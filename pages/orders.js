import router from "../src/router.js";

class OrderPage {
    constructor(domElement){
        this.domElement = domElement;
        this.render();
        this.attachEvents();
        this.getOrdered();
        this.getShared();
        //this.acceptOrder(orderID);
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

            <div id="ordered-food" class="tab-content"></div>

            <div id="food-shared" class="tab-content" style="display:none;"></div>
        </section>
        `;
    } 

    attachEvents(){
        window.switchTabs = (tabID, tabContent) => this.switchTabs(tabID, tabContent);
        window.acceptOrder = (orderID) => this.acceptOrder(orderID);
        window.pickUpOrder = (orderID) => this.pickUpOrder(orderID);
        window.cancelOrder = (orderID) => this.cancelOrder(orderID);
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

    async getOrdered() {
        let authUserID = localStorage.getItem("userID");
        console.log(authUserID);

        let loggedInUserID = {userID : authUserID};
        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=getOrders", {
            method: "POST",
            body: JSON.stringify(loggedInUserID)
        });

        let data = await response.json();
        let orderObject = data.orderData;
        console.log(orderObject);


        let orderTemplate = "";
        for (const item of orderObject) {
            console.log(item);

            if(`${item.orderStatus}` == 1){
                orderTemplate += /*html*/`
                    <div class="ordered-food container margin--top--xs">
                        <div class="ordered-header content--horizontal flex--wrap align--center space--between">
                            <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                                <img class="small--photo" src="${item.sellerImg}">
                                <h3 class="text--bold">${item.sellerName}</h3>
                            </div>
                            <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                                <p>${item.pickUpDate}</p>
                                <p>${item.pickUpTime}</p>
                            </div>
                        </div>
                        <div class="accepted">
                            <div class="pick-up-order container--yellow margin--top--xs">
                                <i class="check-mark text--yellow text--med-bold" data-feather="clock"></i>
                                <p>Your order is awaiting approval</p>
                            </div>
                        </div>
                        <div class="ordered-food-item container">
                            <div class="item-info">
                                <div class="content--horizontal flex--wrap flex--gap space--between">
                                    <h3 class="padding--top--xs text--bold">${item.foodName}</h3>
                                    <div class="content--horizontal flex--wrap padding--top--xs">
                                        <p class="food-amount">${item.amount}</p>
                                        <p class="unit">${item.unit}</p>
                                    </div>
                                </div>
                                <p class="pick-address padding--top--xs padding--bottom--xs">${item.pickUpAddress}</p>
                            </div>
                            <div class="btn--delete delete-item">
                                <i class="delete-icon" data-feather="trash"></i>
                            </div>
                        </div>
                    </div>
                `;
            } else if(`${item.orderStatus}` == 2){
                orderTemplate += /*html*/`
                    <div class="ordered-food container margin--top--xs">
                        <div class="ordered-header content--horizontal flex--wrap align--center space--between">
                            <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                                <img class="small--photo" src="${item.sellerImg}">
                                <h3 class="text--bold">${item.sellerName}</h3>
                            </div>
                            <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                                <p>${item.pickUpDate}</p>
                                <p>${item.pickUpTime}</p>
                            </div>
                            <div class="accepted">
                                <div class="pick-up-order container--green margin--top--xs">
                                    <i class="check-mark text--green text--med-bold" data-feather="check"></i>
                                    <p>Your order has been accepted!</p>
                                </div>
                            </div>
                        </div>
                        <div class="ordered-food-item container">
                            <div class="item-info">
                                <div class="content--horizontal flex--wrap flex--gap space--between">
                                    <h3 class="padding--top--xs text--bold">${item.foodName}</h3>
                                    <div class="content--horizontal flex--wrap padding--top--xs">
                                        <p class="food-amount">${item.amount}</p>
                                        <p class="unit">${item.unit}</p>
                                    </div>
                                </div>
                                <p class="pick-address padding--top--xs padding--bottom--xs">${item.pickUpAddress}</p>
                            </div>
                            <div class="btn--delete delete-item">
                                <i class="delete-icon" data-feather="trash"></i>
                            </div>
                        </div>
                        <button class="btn btn--small btn--cancel content--centered margin--top--sm" onclick="cancelOrder(${item.orderID})">Cancel</button>
                    </div>
                `;

            } else if(`${item.orderStatus}` == 3){
                orderTemplate += /*html*/`
                    <div class="ordered-food container margin--top--xs">
                        <div class="ordered-header content--horizontal flex--wrap align--center space--between">
                            <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                                <img class="small--photo" src="${item.sellerImg}">
                                <h3 class="text--bold">${item.sellerName}</h3>
                            </div>
                            <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                                <p>${item.pickUpDate}</p>
                                <p>${item.pickUpTime}</p>
                            </div>
                        </div>
                        <div class="accepted">
                            <div class="pick-up-order container--green margin--top--xs">
                                <i class="check-mark text--green text--med-bold" data-feather="check"></i>
                                <p>Your food has been picked up!</p>
                            </div>
                        </div>
                        <div class="ordered-food-item container">
                            <div class="item-info">
                                <div class="content--horizontal flex--wrap flex--gap space--between">
                                    <h3 class="padding--top--xs text--bold">${item.foodName}</h3>
                                    <div class="content--horizontal flex--wrap padding--top--xs">
                                        <p class="food-amount">${item.amount}</p>
                                        <p class="unit">${item.unit}</p>
                                    </div>
                                </div>
                                <p class="pick-address padding--top--xs padding--bottom--xs">${item.pickUpAddress}</p>
                            </div>
                        </div>
                    </div>
                `;
            } else if(`${item.orderStatus}` == 0){
                orderTemplate += /*html*/`
                    <div class="ordered-food container margin--top--xs" style="display: none;">
                        <p>Your order has been canceled.</p>
                    </div>
                `;
            }
        }
        this.iconsInit();
        document.querySelector("#ordered-food").innerHTML = orderTemplate;
    }

    async getShared() {

        let authUserID = localStorage.getItem("userID");
        console.log(authUserID);

        let loggedIn = {userID : authUserID};
        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=getShared", {
            method: "POST",
            body: JSON.stringify(loggedIn)
        });

        let data = await response.json();
        let sharedObject = data.sharedData;
        console.log(sharedObject);

        let shareTemplate = "";
        for (const item of sharedObject) {
            console.log(item);

            if(`${item.orderStatus}` == 1){
                shareTemplate += /*html*/`
                <div class="shared-food container margin--top--xs">
                    <div class="shared-header content--horizontal flex--wrap align--center space--between">
                        <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                            <img class="small--photo" src="${item.buyerImg}">
                            <h3 class="text--bold">${item.buyerName}</h3>
                        </div>
                        <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                            <p>${item.pickUpDate}</p>
                            <p>${item.pickUpTime}</p>
                        </div>
                    </div>
                    <p class="padding--bottom--xs">Would like to get from you:</p>
                    <div class="shared-food-item container">
                        <div class="item-info shared-food-container">
                            <div class="content--horizontal flex--wrap flex--gap space--between">
                                <h3 class="padding--top--xs text--bold">${item.foodName}</h3>
                                <div class="content--horizontal flex--wrap padding--top--xs">
                                    <p class="food-amount">${item.amount}</p>
                                    <p class="unit">${item.unit}</p>
                                </div>
                            </div>
                            <p class="pick-address padding--top--xs padding--bottom--xs">${item.pickUpAddress}</p>
                        </div>
                    </div>
                    <div class="not-accepted content--horizontal flex--wrap space--around">
                        <button class="btn btn--small btn--cancel" onclick="cancelOrder(${item.orderID})">Reject</button>
                        <button class="btn btn--small btn--primary" onclick="acceptOrder(${item.orderID})">Accept</button>
                    </div>
                </div>
                `;
            } else if(`${item.orderStatus}` == 2){
                shareTemplate += /*html*/`
                <div class="shared-food container margin--top--xs">
                    <div class="shared-header content--horizontal flex--wrap align--center space--between">
                        <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                            <img class="small--photo" src="${item.buyerImg}">
                            <h3 class="text--bold">${item.buyerName}</h3>
                        </div>
                        <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                            <p>${item.pickUpDate}</p>
                            <p>${item.pickUpTime}</p>
                        </div>
                    </div>
                    <div class="accepted margin--bottom--xs">
                        <div class="order-accepted container--green margin--top--xs padding--top--xs">
                            <i class="check-mark text--green text--med-bold" data-feather="check"></i>
                            <p class="confirmation-text text--green text--med-bold">You accepted the order</p>
                            <p class="cancel-text padding--bottom--xs">If you want to cancel it, you have:<span class="text--semi-bold"> 30min</span></p>
                        </div>
                    </div>
                    <div class="shared-food-item container">
                        <div class="item-info shared-food-container">
                            <div class="content--horizontal flex--wrap flex--gap space--between">
                                <h3 class="padding--top--xs text--bold">${item.foodName}</h3>
                                <div class="content--horizontal flex--wrap padding--top--xs">
                                    <p class="food-amount">${item.amount}</p>
                                    <p class="unit">${item.unit}</p>
                                </div>
                            </div>
                            <p class="pick-address padding--top--xs padding--bottom--xs">${item.pickUpAddress}</p>
                        </div>
                    </div>
                    <div class="not-accepted content--horizontal flex--wrap space--around">
                            <button class="btn btn--small btn--cancel" onclick="cancelOrder(${item.orderID})">Reject</button>
                            <button class="btn btn--small btn--primary" onclick="pickUpOrder(${item.orderID})">Confirm pick up</button>
                        </div>
                </div>
                `;
            } else if(`${item.orderStatus}` == 3){
                shareTemplate += /*html*/`
                <div class="shared-food container margin--top--xs">
                    <div class="shared-header content--horizontal flex--wrap align--center space--between">
                        <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                            <img class="small--photo" src="${item.buyerImg}">
                            <h3 class="text--bold">${item.buyerName}</h3>
                        </div>
                        <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
                            <p>${item.pickUpDate}</p>
                            <p>${item.pickUpTime}</p>
                        </div>
                    </div>
                    <div class="accepted margin--bottom--xs">
                        <div class="order-accepted container--green margin--top--xs padding--top--xs">
                            <i class="check-mark text--green text--med-bold" data-feather="check"></i>
                            <p>This product has been picked up.</p>
                        </div>
                    </div>
                    <div class="shared-food-item container">
                        <div class="item-info shared-food-container">
                            <div class="content--horizontal flex--wrap flex--gap space--between">
                                <h3 class="padding--top--xs text--bold">${item.foodName}</h3>
                                <div class="content--horizontal flex--wrap padding--top--xs">
                                    <p class="food-amount">${item.amount}</p>
                                    <p class="unit">${item.unit}</p>
                                </div>
                            </div>
                            <p class="pick-address padding--top--xs padding--bottom--xs">${item.pickUpAddress}</p>
                        </div>
                    </div>
                </div>
                `;
            }

            // shareTemplate += /*html*/`
            //     <div class="shared-food container margin--top--xs">
            //         <div class="shared-header content--horizontal flex--wrap align--center space--between">
            //             <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
            //                 <img class="small--photo" src="${item.buyerImg}">
            //                 <h3 class="text--bold">${item.buyerName}</h3>
            //             </div>
            //             <div class="content--horizontal flex--wrap align--center flex--gap padding--bottom--sm">
            //                 <p>${item.pickUpDate}</p>
            //                 <p>${item.pickUpTime}</p>
            //             </div>
            //         </div>
            //         <p class="padding--bottom--xs">Would like to get from you:</p>
            //         <div class="shared-food-item container">
            //             <div class="item-info shared-food-container">
            //                 <div class="content--horizontal flex--wrap flex--gap space--between">
            //                     <h3 class="padding--top--xs text--bold">${item.foodName}</h3>
            //                     <div class="content--horizontal flex--wrap padding--top--xs">
            //                         <p class="food-amount">${item.amount}</p>
            //                         <p class="unit">${item.unit}</p>
            //                     </div>
            //                 </div>
            //                 <p class="pick-address padding--top--xs padding--bottom--xs">${item.pickUpAddress}</p>
            //             </div>
            //         </div>
            //         <div class="not-accepted content--horizontal flex--wrap space--around">
            //             <button class="btn btn--small btn--cancel" onclick="cancelOrder(${item.orderID})">Reject</button>
            //             <button class="btn btn--small btn--primary" onclick="acceptOrder(${item.orderID})">Accept</button>
            //         </div>
            //         <div class="accepted">
            //             <div class="order-accepted container--green margin--top--xs padding--top--xs">
            //                 <i class="check-mark text--green text--med-bold" data-feather="check"></i>
            //                 <p class="confirmation-text text--green text--med-bold">You accepted the order</p>
            //                 <p class="cancel-text padding--bottom--xs">If you want to cancel it, you have:<span class="text--semi-bold"> 30min</span></p>
            //             </div>
            //             <button class="btn btn--small btn--cancel content--centered margin--top--sm" onclick="cancelOrder(${item.orderID})">Cancel the order</button>
            //         </div>
            //     </div>
            // `;
        }
        this.iconsInit();
        document.querySelector("#food-shared").innerHTML = shareTemplate;
    }

    async acceptOrder(orderID){
        console.log(orderID);

        let orderObject = {orderFoodID : orderID};
        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=updateStatus", {
            method: "POST",
            body: JSON.stringify(orderObject)
        });

        let data = await response.json();
        let feedback = data.orderAccepted;
        console.log(feedback);

        this.getShared();
    }

    async pickUpOrder(orderID){
        console.log(orderID);

        let orderObject = {orderFoodID : orderID};
        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=pickUpStatus", {
            method: "POST",
            body: JSON.stringify(orderObject)
        });

        let data = await response.json();
        let feedback = data.orderCanceled;
        console.log(feedback);


        this.getShared();
        //this.getOrdered();
    }

    async cancelOrder(orderID){
        console.log(orderID);

        let orderObject = {orderFoodID : orderID};
        const response = await fetch("http://localhost:3000//backend/foodproducts.php?action=cancelStatus", {
            method: "POST",
            body: JSON.stringify(orderObject)
        });

        let data = await response.json();
        let feedback = data.orderCanceled;
        console.log(feedback);

        this.getOrdered();
    }

    iconsInit(){
        feather.replace();
    }
}

export default OrderPage;