class Router {

    constructor(app, defaultPage){
        this.defaultPage = defaultPage;
        this.basePath = location.pathname.replace("index.html","");

        this.pages = app.querySelectorAll(".page");
        this.navItems = app.querySelectorAll(".nav-link");

        //Setting the routes for SPA navigation
        this.routes = {
            "#/home": "home",
            "#/orders" : "orders",
            "#/add" : "add",
            "#/profile" : "profile",
            "#/more" : "more",
            "#/settings" : "settings",
            "#/start" : "start",
            "#/login" : "login",
            "#/signup" : "signup"
        };
        this.initRouter();
    }

    //Router functionality
    initRouter(){
        this.attachNavLinkEvents();
        window.addEventListener("popstate", () => this.showPage(location.hash));

        if (this.routes[location.hash]) {
            this.defaultPage = location.hash;
        }

        this.navigateTo(this.defaultPage);
    }

    //Get link href and navigate to this path
    attachNavLinkEvents(){
        for (const link of this.navItems) {
            link.addEventListener("click", event => {
                const path = link.getAttribute("href");
                this.navigateTo(path);
                event.preventDefault();
            })
        }
    }

    // Navigating to new page by getting its href
    navigateTo(path){
        window.history.pushState({}, path, this.basePath + path);
        this.showPage(path);
    }

    showPage(path){
        this.hideAllPages();
        document.querySelector(`#${this.routes[path]}`).style.display = "flex";
        this.setActiveTab(path);
    }
    
    hideAllPages(){
        for (const page of this.pages) {
            page.style.display="none";
        }
    }

    setActiveTab(pathname){
        for (const link of this.navItems) {
            if(pathname === link.getAttribute("href")){
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        }
    }
}

// export function hideNav(){
//     document.querySelector(".nav").style.display = "none";
// }

// export function showNav(){
//     document.querySelector(".nav").style.display = "grid";
// }

export function hideNav(hide){
    if (hide) {
        document.querySelector(".nav").style.display = "none";
    } else {
        document.querySelector(".nav").style.display = "grid";
    }
}

export default Router;