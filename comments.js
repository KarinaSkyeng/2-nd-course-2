import { postTodo } from "./api.js";
import { toggleAddingCommentMessage } from "./loaders.js";
import { loadCommentsFromAPI } from "./main.js";
import { highlightEmptyFields } from "./validation.js";
import { getUser } from "./auth.js";

export function addComment() {
    const buttonElement = document.querySelector(".add-form-button");
    const nameElement = document.querySelector(".add-form-name");
    const textElement = document.querySelector(".add-form-text");
    const currentUser = getUser();
    
    nameElement.value = currentUser.name;
    buttonElement.addEventListener("click", () => {
        const name = nameElement.value.trim();
        const text = textElement.value.trim();
    
            if (!name || !text) {
                highlightEmptyFields(nameElement, textElement);
                return;
            }
    
            toggleAddingCommentMessage(true);           
           
    if (currentUser) {
        const newComment = {
            name: name,
            text: text
        };   
               
        postTodo(newComment)
            .then((data) => {
                nameElement.value = "";
                textElement.value = "";
                
                loadCommentsFromAPI();                                               
            }) 
            .catch(error => {
                console.error("Ошибка при добавлении комментария:", error);
                if (error && error.message === "Ошибка при отправке комментария") {
                    console.log("Ошибка 400:", error.message);
                    alert("Имя и комментарий должны содержать не менее 3-х символов.");
                } 
            })                       
            .finally(() => {
                toggleAddingCommentMessage(false); // Скрываем сообщение о добавлении комментария
            });
        } else {
            // Если пользователь не авторизован, выполните действия, например, покажите форму для авторизации
            console.log("Пользователь не авторизован. Показываем форму для авторизации.");
            // Дополнительные действия в случае, если пользователь не авторизован
        }
    });    
}