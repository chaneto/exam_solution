import { html } from "../lib.js";
import { render } from "../lib.js";
import { page } from "../lib.js";
const main = document.getElementById("content");
const url = "http://localhost:3030/data/pets/";
const urlDonate = "http://localhost:3030/data/donation";



const detailsTemplate = (pet, onDelete, isOwner, isNotOwner, onDonate, userIsDonateOrNot, allDonateTotal) => html`
<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src=${pet.image}>
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age} years</h4>
            <h4>Weight: ${pet.weight}kg</h4>
            <h4 class="donation">Donation: ${allDonateTotal}$</h4>
        </div>
        <!-- if there is no registered user, do not display div-->

        <div class="actionBtn">
        <!-- Only for registered user and creator of the pets-->
        ${isOwner ? html`  <a href="/edit/${pet._id}" class="edit">Edit</a>` : null}
        ${isOwner ? html`   <a href="#" @click=${onDelete} class="remove">Delete</a>` : null}
        <!--(Bonus Part) Only for no creator and user-->
        ${isNotOwner &&  userIsDonateOrNot == 0 ? html`<a href="" @click=${onDonate} class="donate">Donate</a>` : null}
    </div>
       
    </div>
</div>
</section>
`;



export async function detailsPage(event) {
     let petId = event.params.id; 
     let userdata = JSON.parse(sessionStorage.getItem("userdata"));

     try {
        const res =  await fetch(url + petId);
        if(res.status != 200){
            throw new Error("Invalid request!!!");
        }

        const pet = await res.json();
        const isOwner = userdata && pet._ownerId == userdata.id;
        const isNotOwner = userdata && pet._ownerId != userdata.id;
        const userIsDonateOrNot = await userIsDonate(petId, userdata.id);
        const allDonateTotal = await allDonate(petId) * 100;

        render(detailsTemplate(pet, onDelete, isOwner, isNotOwner, onDonate, userIsDonateOrNot, allDonateTotal), main);

        async function onDonate(donate) {
            donate.preventDefault();

            let data = {
                petId: petId
                       }

            const option = {
                method: "post",
                headers: {['x-Authorization']: userdata.token},
                body: JSON.stringify(data)
            };
           
            try {
                const res = await fetch(urlDonate, option);
                if(res.status != 200){
                    throw new Error("invalid request please try again");
                  }
                 
                  page.redirect("/details/" + petId);
                 
            } catch (error) {
                alert(error.message);
            }
        }

        async function onDelete(del) {
            del.preventDefault();
            if (confirm("Do you want to delete this item????") == true) {
            const option = {
                method: "delete",
                headers: {['x-Authorization']: userdata.token}
            };

            try {
                const res =  await fetch(url + petId, option);
                if(res.status != 200){
                    throw new Error("Invalid request!!!");
                }

                page.redirect("/");
        
             } catch (error) {
                 alert(error.message);
             }
          }
        }
     } catch (error) {
         alert(error.message);
     }
};

async function userIsDonate(petId, userId) {
    try {
        const res = await fetch(urlDonate + `?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
        if(res.status != 200){
            throw new Error("Invalid request!!!");
        }
        return await res.json();
    } catch (error) {
        
    }
};

async function allDonate(petId) {
    try {
        const res = await fetch(urlDonate + `?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
        if(res.status != 200){
            throw new Error("Invalid request!!!");
        }
        return await res.json();
    } catch (error) {
        
    }
}