
import { postTodo, getTodos } from "./api.js";
import { resetValidation } from "./validation.js";
import { toggleAddingCommentMessage } from "./loaders.js";
import { addComment } from "./comments.js";
import { renderComments } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
    loadCommentsFromAPI();
});



// Переменные для сохранения введенных данных
let enteredName = "";
let enteredText = "";

// Найти элементы формы
const nameElement = document.querySelector(".add-form-name");
const textElement = document.querySelector(".add-form-text");



// Функция для загрузки списка комментариев из API
export function loadCommentsFromAPI() {
    // Показываем сообщение о загрузке
    document.getElementById("loading-message").style.display = "block";

    
        getTodos().then((data) => {             
            // Скрываем сообщение о загрузке после загрузки комментариев
            document.getElementById("loading-message").style.display = "none";
           
            renderComments(data.comments);
        })
        .catch((error) => { 
            console.error("Ошибка при загрузке комментариев:", error);
            // Выводим алерт о произошедшей ошибке
            alert("Сервер сломался, попробуйте позже.");

            // Скрываем сообщение о загрузке в случае ошибки
            document.getElementById("loading-message").style.display = "none";

            // Отображаем заглушку
            document.querySelector(".comments").innerHTML = "<li>Не удалось загрузить комментарии</li>";
        });
}



// Функция для добавления комментария в список и обновления отображения


// Обработчик события для кнопки "Написать"


// Функция для отрисовки всех комментариев


// Функция для обновления состояния лайка


// Функция для создания элемента комментария

// Функция для подсветки пустых полей


// Функция для сброса стилей валидации


// Обработчик события при вводе текста в поля ввода
nameElement.addEventListener("input", () => {
    resetValidation(nameElement, textElement);
});
textElement.addEventListener("input", () => {
    resetValidation(nameElement, textElement);
});
 

  // Функция для получения текущей даты и времени
