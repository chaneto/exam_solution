
import { page } from "./lib.js"
import { createPage } from "./view/create.js";
import { dashboardPage } from "./view/dashboard.js";
import { detailsPage } from "./view/details.js";
import { editPage } from "./view/edit.js";
import { homePage } from "./view/home.js";
import { loginPage } from "./view/login.js";
import { logout } from "./view/logout.js";
import { registerPage } from "./view/register.js";


export function updateUserNav() {
    let userdata = JSON.parse(sessionStorage.getItem("userdata"));
    if(userdata){
      document.getElementById("user").style.display = "";
      document.getElementById("guest").style.display = "none";
    }else{
        document.getElementById("user").style.display = "none";
        document.getElementById("guest").style.display = "";
    }
}

page("/", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/logout", logout);
page("/dashboard", dashboardPage);
page("/details/:id", detailsPage);
page("/create", createPage);
page("/edit/:id", editPage);
updateUserNav();
page.start();