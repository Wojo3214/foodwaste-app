export default class Dialog {
    constructor(domElement){
        this.domElement = domElement;
        this.attachEvents();    
    }
    render(){
        this.domElement.innerHTML += /*html*/`
        <div class="dialog" id="order-dialog">
            <div class="dialog-container">
                <img src="../src/img/great-job-img.svg" alt="illustration">
                <div class="dialog-content">
                    <h4>Great job!</h4>
                    <p>Your request has been sent to the seller. Please, wait for a confirmation. Thanks to you and your order, you have an impact on reducing food waste!</p>
                    <button class="btn btn--normal btn--primary" onclick="closeDialog()">Close</button>
                </div>
            </div>
        </div>
        `;
        this.init();
    }

    attachEvents(){
        window.closeDialog = () => this.closeDialog();
    }

    closeDialog() {
        document.querySelector("#order-dialog").style.display = "none";
    }

    init(){
        feather.replace();
    }
}