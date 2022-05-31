import { html } from "../lib.js";
import { render } from "../lib.js";
import { page } from "../lib.js";
const main = document.getElementById("content");
const url = "http://localhost:3030/data/pets/";


const editTemplate = (pet) => html`
<section id="editPage">
<form class="editForm">
    <img src=${pet.image}>
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" .value=${pet.name}>
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" .value=${pet.breed}>
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" .value=${pet.age}>
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" .value=${pet.weight}>
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" .value=${pet.image}>
        </div>
        <button id="editBtn" class="btn" type="submit">Edit Pet</button>
    </div>
</form>
</section>
`;



export async function editPage(event) {
    let petId = event.params.id;
    let userdata = JSON.parse(sessionStorage.getItem("userdata"));
    try {
        const res = await fetch(url + petId);
        if(res.status != 200){
            throw new Error("Invalid request!!!");
        }

        const pet = await res.json();
        render(editTemplate(pet), main);
    } catch (error) {
        
    }
    
    let name = document.getElementById("name");
    let breed = document.getElementById("breed");
    let age = document.getElementById("age");
    let weight = document.getElementById("weight");
    let image = document.getElementById("image");
    let editBtn = document.getElementById("editBtn");

    editBtn.addEventListener("click", onEdit);
  async  function onEdit(event) {
     event.preventDefault();
     let data = {
             name: name.value,
             breed: breed.value,
             age: age.value,
             weight: weight.value,
             image: image.value
               }
           
     const option = {
        method: "put",
        headers: {['x-Authorization']: userdata.token},
        body: JSON.stringify(data)
                   }
   
       try {

        if(name.value == "" || breed.value == "" || age.value == ""
        || weight.value == "" || image.value == ""){
            throw new Error("Pleace fill all field!!!");
        }

                   const res = await fetch(url + petId, option);
                  if(res.status != 200){
                      throw new Error("invalid request please try again");
                    }
                   
                   page.redirect("/details/" + petId);
                   
               } catch (err) {
                  alert(err.message);
               }
            }
};