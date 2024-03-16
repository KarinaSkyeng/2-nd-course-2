import { postTodo, getTodos } from "./api.js";
import { resetValidation } from "./validation.js";
import { renderComments } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
    loadCommentsFromAPI();
});

export const nameElement = document.querySelector(".add-form-name");
export const textElement = document.querySelector(".add-form-text");

export function loadCommentsFromAPI() {
    document.getElementById("loading-message").style.display = "block";

    
        getTodos().then((data) => {
            document.getElementById("loading-message").style.display = "none";
           
            renderComments(data.comments);
        })
        .catch((error) => { 
            console.error("Ошибка при загрузке комментариев:", error);            
            alert("Сервер сломался, попробуйте позже.");

            document.getElementById("loading-message").style.display = "none";

            document.querySelector(".comments").innerHTML = "<li>Не удалось загрузить комментарии</li>";
        });
}

nameElement.addEventListener("input", () => {
    resetValidation(nameElement, textElement);
});
textElement.addEventListener("input", () => {
    resetValidation(nameElement, textElement);
});

