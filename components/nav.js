export default class Nav {
    constructor(domElement){
        this.domElement = domElement;
    }
    render(){
        this.domElement.innerHTML += /*html*/`
        <nav class="nav">
            <a href="#/home" class="nav-link"><i data-feather="home"></i></a>
            <a href="#/orders" class="nav-link"><i data-feather="shopping-bag"></i></a>
            <a href="#/add" class="nav-link"><i data-feather="plus" class="plus"></i></a>
            <a href="#/profile" class="nav-link"><i data-feather="user"></i></a>
            <a href="#/more" class="nav-link"><i data-feather="more-vertical"></i></a>
        </nav>
        `;
        this.init();
    }
    init(){
        feather.replace();
    }
}