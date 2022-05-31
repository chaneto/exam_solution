import { page } from "../lib.js";
import { updateUserNav }  from "../app.js";
const url = "http://localhost:3030/users/logout";

export async function logout() {
    let userdata = JSON.parse(sessionStorage.getItem("userdata"));
    const option = {
        method: "get",
        headers: {['x-Authorization']: userdata.token}
    };
   
    try {
        const res = await fetch(url, option);
        if(res.status != 204){
            throw new Error("invalid request please try again");
          }
          sessionStorage.removeItem("userdata");
          updateUserNav();
          page.redirect("/");
         
    } catch (error) {
        alert(error.message);
    }
};