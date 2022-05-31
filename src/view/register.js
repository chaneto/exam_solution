import { html } from "../lib.js";
import { render } from "../lib.js";
import { page } from "../lib.js";
import { updateUserNav }  from "../app.js"
const main = document.getElementById("content");
const url = "http://localhost:3030/users/register";


const registerTemplate = () => html`
<section id="registerPage">
<form class="registerForm">
    <img src="./images/logo.png" alt="logo" />
    <h2>Register</h2>
    <div class="on-dark">
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div class="on-dark">
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
    </div>

    <button id="registerBtn" class="btn" type="submit">Register</button>

    <p class="field">
        <span>If you have profile click <a href="/login">here</a></span>
    </p>
</form>
</section>
`;



export async function registerPage() {
    render(registerTemplate(), main);
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let passwordConfirm = document.getElementById("repeatPassword");
    let registerBtn = document.getElementById("registerBtn");
    registerBtn.addEventListener("click", onRegister);
  async  function onRegister(event) {
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

        if(email.value == "" || password.value == "" || passwordConfirm.value == ""){
            throw new Error("Pleace fill all field!!!");
        }

        if(password.value != passwordConfirm.value ){
            throw new Error("Password dont match!!!");
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
                   updateUserNav();
                   page.redirect("/");
                   return resData;
                   
               } catch (error) {
                  alert(error.message);
               }
            }
};