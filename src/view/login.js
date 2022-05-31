import { html } from "../lib.js";
import { render } from "../lib.js";
import { page } from "../lib.js";
import { updateUserNav }  from "../app.js"
const main = document.getElementById("content");
const url = "http://localhost:3030/users/login";


const loginTemplate = () => html`
<section id="loginPage">
<form class="loginForm">
    <img src="./images/logo.png" alt="logo" />
    <h2>Login</h2>

    <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div>
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <button id="loginBtn" class="btn" type="submit">Login</button>

    <p class="field">
        <span>If you don't have profile click <a href="/register">here</a></span>
    </p>
</form>
</section>
`;



export async function loginPage() {
    render(loginTemplate(), main);
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click", onLogin);
  async  function onLogin(event) {
     event.preventDefault();
    let data = {
        email: email.value,
        password: password.value
                }
            
      const option = {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
                 }
    
     try {

                 if(email.value == "" || password.value == ""){
                     throw new Error("Pleace fill all field!!!");
                 }
                    const res = await fetch(url, option);
                   if(res.status != 200){
                       throw new Error("invalid request please try again");
                     }
                     const resData = await res.json();
                     const userdata = {
                        email: resData.email,
                        id: resData._id,
                        token: resData.accessToken
                    }
                    sessionStorage.setItem("userdata", JSON.stringify(userdata));
                    page.redirect("/");
                    updateUserNav();
                    return resData;
                    
                } catch (error) {
                   alert(error.message);
                }
            }
};