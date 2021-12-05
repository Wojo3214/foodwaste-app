import Router from "./router.js";
import StartPage from "../pages/start-page.js";
import LoginPage from "../pages/login-page.js";
import SignUpPage from "../pages/sign-up-page.js";
import HomePage from "../pages/home.js";
import OrderPage from "../pages/orders.js";
import ProfilePage from "../pages/profile.js";
import ProductPage from "../pages/product-page.js";
import Nav from "../components/nav.js";



const app = document.querySelector("#app");
const nav = new Nav(app);
nav.render();
const pages = document.querySelector("#pages");


const startPage = new StartPage(pages);
const homePage = new HomePage(pages);
const orderPage = new OrderPage(pages);
const profilePage = new ProfilePage(pages);
const productPage = new ProductPage(pages);
const loginPage = new LoginPage(pages);
const signupPage = new SignUpPage(pages);


const router = new Router(app, "#/");
