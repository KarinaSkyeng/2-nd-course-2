import { getTodos } from "./api.js";
import { resetValidation } from "./validation.js";
import { renderComments } from "./render.js";
import { addComment } from "./comments.js";
import { login } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    // Добавляем обработчик события на слово "авторизуйтесь"
    document.getElementById("login-link").addEventListener("click", () => {
        renderLoginForm(); // Функция для отображения формы авторизации
    });

    loadCommentsFromAPI();
});

// Функция для отображения формы авторизации
function renderLoginForm() {
    const loginElement = document.createElement("div");
    loginElement.classList.add("login");

    const loginHTML = `
    <div class="login-form">
        <input class="login-input-pass" type="text" id="username" placeholder="Логин">
        <input class="login-input-pass" type="password" id="password-login" placeholder="Пароль">
        <button class="button-login" id="login-button">Войти</button>
    </div>
    `;

    loginElement.innerHTML = loginHTML;

    document.querySelector(".add-form").style.display = "none";

    // Вставляем форму авторизации перед словом "авторизуйтесь"
    const authMessage = document.getElementById("auth-message");
    authMessage.parentNode.insertBefore(loginElement, authMessage);
// Добавляем обработчик события на кнопку "Войти"
loginElement.querySelector('#login-button').addEventListener("click", async () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password-login").value;

    try {
        console.log("Отправляем данные на сервер для входа:", username, password);
        await login({ login, password });
        handleSuccessfulLogin();// Обработка успешной аутентификации
    } catch (error) {
        console.error("Ошибка при входе:", error);
        // Обработка ошибки входа
    }
});
}

function handleSuccessfulLogin() {
    document.querySelector(".add-form").style.display = "block";
    addComment(); // Вызываем функцию добавления комментария
}

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