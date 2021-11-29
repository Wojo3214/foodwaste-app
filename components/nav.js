class NavComponent {
    constructor() {
        this.render();
        this.nav = document.querySelector(".nav");
    }

    render() {
        document.body.innerHTML += /*html*/`
            <nav class="nav">
                <a href="#/home" class="nav-link"><i data-feather="home"></i></a>
                <a href="#/orders" class="nav-link"><i data-feather="shopping-bag"></i></a>
                <a href="#/add" class="nav-link"><i data-feather="plus" class="plus"></i></a>
                <a href="#/profile" class="nav-link"><i data-feather="user"></i></a>
                <a href="#/more" class="nav-link"><i data-feather="more-vertical"></i></a>
            </nav>
        `;
    }

    hideNav(hide){
        if (hide) {
            this.nav.style.display = "none";
        } else {
           this.nav.style.display = "grid";
        }
    }

    // show(show) {
    //     if (show) {
    //         this.loader.classList.remove("hide");
    //     } else {
    //         this.loader.classList.add("hide");
    //     }
    // }

}

const nav = new NavComponent();
export default nav;