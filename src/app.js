//Importing Classes from JS files
import router from "./router.js";
import StartPage from "../pages/start-page.js";
import LoginPage from "../pages/login-page.js";

import SignUpPage from "../pages/sign-up-page.js";
import UpdateUserPage from "../pages/update-user.js";
import HomePage from "../pages/home.js";
import OrderPage from "../pages/orders.js";
import ProfilePage from "../pages/profile.js";
import ProductPage from "../pages/product-page.js";
import SettingsPage from "../pages/settings.js";
import MorePage from "../pages/more.js";
import AddItemPage from "../pages/add-page.js";
import BookingPage from "../pages/booking-page.js";

import Nav from "../components/nav.js";



const app = document.querySelector("#app");
const nav = new Nav(app);
nav.render();
const pages = document.querySelector("#pages");

//Creating Instances of the JS classes
const startPage = new StartPage(pages);
const homePage = new HomePage(pages);
const orderPage = new OrderPage(pages);
const profilePage = new ProfilePage(pages);
const productPage = new ProductPage(pages);
const addPage = new AddItemPage(pages);
const settingsPage = new SettingsPage(pages);
const morePage = new MorePage(pages);
const signupPage = new SignUpPage(pages);
const updateUserPage = new UpdateUserPage(pages);
const loginPage = new LoginPage(pages);
const bookingPage = new BookingPage(pages);



router.initRouter();




