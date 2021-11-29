import Router from "./router.js";
import StartPage from "../pages/start-page.js";
import LoginPage from "../pages/login-page.js";
import SignUpPage from "../pages/sign-up-page.js";
import HomePage from "../pages/home.js";


const pages = document.querySelector("#pages");
const app = document.querySelector("#app");

const startPage = new StartPage(pages);
const homePage = new HomePage(pages);
const loginPage = new LoginPage(pages);
const signupPage = new SignUpPage(pages);


const router = new Router(app, "#/");
