import { postTodo } from "./api.js";
import { toggleAddingCommentMessage } from "./loaders.js";
import { loadCommentsFromAPI } from "./main.js";
import { highlightEmptyFields } from "./validation.js";

export function addComment() {
    const buttonElement = document.querySelector(".add-form-button");
    const nameElement = document.querySelector(".add-form-name");
    const textElement = document.querySelector(".add-form-text");
    buttonElement.addEventListener("click", () => {
        const name = nameElement.value.trim();
        const text = textElement.value.trim();
    
            if (!name || !text) {
                highlightEmptyFields(nameElement, textElement);
                return;
            }
    
            toggleAddingCommentMessage(true);    
    
        const newComment = {
            name: name,
            text: text,
            forceError: true,
        };
        
            postTodo(newComment).then((data) => {
                nameElement.value = "";
                textElement.value = "";
                
                loadCommentsFromAPI();                                               
            }) 
            .catch((error) => {
                console.error("Ошибка при добавления комментария:", error);
                if (error && error.message === "Ошибка при добавлении комментария") {
                    console.log("Ошибка 400:", error.message);
                    alert("Имя и комментарий должны содержать не менее 3x символов.");
                }
            })                       
            .finally(() => {
                toggleAddingCommentMessage(false); // Скрываем сообщение о добавлении комментария
            });
    });    
}