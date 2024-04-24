import { getTodos } from "./api.js";
//import { resetValidation } from "./validation.js";
import { renderComments } from "./render.js";

const loadingMessage = `<div id="loading-message" style="display: none;">Пожалуйста подождите, загружаю комментарии...</div>
`;
document.addEventListener("DOMContentLoaded", () => {
      
      loadCommentsFromAPI();
});

export const nameElement = document.querySelector(".add-form-name");
export const textElement = document.querySelector(".add-form-text");

export function loadCommentsFromAPI() {
    const app = document.getElementById('app')

    app.innerHTML = loadingMessage
       
        getTodos().then((data) => {          
            renderComments(data.comments);
        })
        .catch((error) => { 
            console.error("Ошибка при загрузке комментариев:", error);            
            alert("Сервер сломался, попробуйте позже.");

            document.querySelector(".comments").innerHTML = "<li>Не удалось загрузить комментарии</li>";
        });
        
}

//nameElement.addEventListener("input", () => {
//    resetValidation(nameElement, textElement);
//});
//textElement.addEventListener("input", () => {
//    resetValidation(nameElement, textElement);
//});