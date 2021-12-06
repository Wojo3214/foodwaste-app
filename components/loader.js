class LoaderComponent {
    constructor(){
        this.render();
        this.loader = document.querySelector(".loader");
    }
    render(){
        document.body.innerHTML += /*html*/`
            <section class="loader">
                <div class="loader-dot loader-dot1"></div>
                <div class="loader-dot loader-dot2"></div>
                <div class="loader-dot loader-dot3"></div>
            </section>
        `;
    }
    show(show){
        if(show){
            this.loader.classList.remove("hide");
        } else{
            this.loader.classList.add("hide");
        }
    }
}

const loader = new LoaderComponent();
export default loader;