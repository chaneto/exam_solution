import { html } from "../lib.js";
import { render } from "../lib.js";
import { page } from "../lib.js";
const main = document.getElementById("content");
const url = "http://localhost:3030/data/pets";


const createTemplate = () => html`
<section id="createPage">
<form class="createForm">
    <img src="./images/cat-create.jpg">
    <div>
        <h2>Create PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" placeholder="Max">
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" placeholder="2 years">
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" placeholder="5kg">
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
        </div>
        <button id="createBtn" class="btn" type="submit">Create Pet</button>
    </div>
</form>
</section>
`;



export async function createPage() {
    render(createTemplate(), main);
    let userdata = JSON.parse(sessionStorage.getItem("userdata"));
    let name = document.getElementById("name");
    let breed = document.getElementById("breed");
    let age = document.getElementById("age");
    let weight = document.getElementById("weight");
    let image = document.getElementById("image");
    let createBtn = document.getElementById("createBtn");

    createBtn.addEventListener("click", onCreate);
  async  function onCreate(event) {
     event.preventDefault();
     let data = {
             name: name.value,
             breed: breed.value,
             age: age.value,
             weight: weight.value,
             image: image.value
               }
           
     const option = {
        method: "post",
        headers: {['x-Authorization']: userdata.token},
        body: JSON.stringify(data)
                   }
   
       try {

        if(name.value == "" || breed.value == "" || age.value == ""
        || weight.value == "" || image.value == ""){
            throw new Error("Pleace fill all field!!!");
        }

                   const res = await fetch(url, option);
                  if(res.status != 200){
                      throw new Error("invalid request please try again");
                    }
                   
                   page.redirect("/");
                   
               } catch (err) {
                  alert(err.message);
               }
            }
};