
import { getIceApi } from "./api/getApi"; 
import { delIceApi } from "./api/deliceApi";
import { postIceApi } from "./api/postlsApi"; 
import { updateIceApi } from "./api/updateIceApi";
import { createItemsMarkup } from "./markup/create-items"; 

const listEl = document.querySelector(".js-list");
const formRef = document.querySelector(".modal_form");
const backdrop = document.querySelector(".bakdrop");
const openBtn = document.querySelector(".open_modal");

let editCardId = null; 


function openModal() {
  backdrop.style.opacity = "1";
  backdrop.style.pointerEvents = "auto";
}

function closeModal() {
  backdrop.style.opacity = "0";
  backdrop.style.pointerEvents = "none";
}

openBtn.addEventListener("click", () => {
  editCardId = null;
  formRef.reset();
  openModal();
});


formRef.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const { title, calories, price, description, image } = evt.target.elements;

  
  const data = {
    title: title.value.trim(),
    calories: Number(calories.value.trim()),
    price: Number(price.value.trim()),
    description: description.value.trim(),
    image: image.value.trim(),
  };


  if (
    Object.values(data).some(
      (val) => val === "" || isNaN(data.calories) || isNaN(data.price)
    )
  ) {
    alert("Будь ласка, заповніть усі поля коректно.");
    return;
  }

 
  if (editCardId === null) {
    
    postIceApi(data)
      .then(getIceApi) 
      .then((res) => {
        listEl.innerHTML = createItemsMarkup(res);
        formRef.reset();
        closeModal();
      })
      .catch((err) => console.error("Помилка POST-запиту:", err));
    return;
  }


  updateIceApi(editCardId, data)
    .then(() => getIceApi()) 
    .then((res) => {
      listEl.innerHTML = createItemsMarkup(res);
      formRef.reset();
      closeModal();
    })
    .catch((err) => console.error("Помилка PUT-запиту:", err));
});



listEl.addEventListener("click", (event) => {
  const listItem = event.target.closest("li");
  if (!listItem) return;
  const itemId = listItem.id;

  
  if (event.target.dataset.action === "Delete") {
    delIceApi(itemId)
      .then(getIceApi)
      .then((res) => {
        listEl.innerHTML = createItemsMarkup(res);
      })
      .catch((err) => console.error("Помилка DELETE-запиту:", err));
  }


  if (event.target.dataset.action === "Edit") {
    getIceApi()
      .then((res) => {
        const card = res.find((el) => el.id === itemId); 
        if (!card) return;

      
        formRef.elements.title.value = card.title || "";
        formRef.elements.calories.value = card.calories || "";
        formRef.elements.price.value = card.price || "";
        formRef.elements.description.value = card.description || "";
        formRef.elements.image.value = card.image || "";

        editCardId = card.id; 
        openModal();
      })
   
  }
});


getIceApi()
  .then((res) => {
    listEl.innerHTML = createItemsMarkup(res);
  })
 
