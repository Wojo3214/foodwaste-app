import Router from "./router.js";
import StartPage from "../pages/start-page.js";
import LoginPage from "../pages/login-page.js";
import SignUpPage from "../pages/sign-up-page.js";
import HomePage from "../pages/home.js";
import ProfilePage from "../pages/profile.js";
import Nav from "../components/nav.js";



const app = document.querySelector("#app");
const nav = new Nav(app);
nav.render();
const pages = document.querySelector("#pages");


const startPage = new StartPage(pages);
const homePage = new HomePage(pages);
const profilePage = new ProfilePage(pages);
const loginPage = new LoginPage(pages);
const signupPage = new SignUpPage(pages);


const router = new Router(app, "#/");
