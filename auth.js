import { setToken } from "./api.js";

import { showComments, renderCommentsForm } from "./render.js";

export const login = async ({ login, password }) => {
    console.log(login, password);
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST", 
        body: JSON.stringify({ login, password }),
    })
    .then(response => {
        console.log("Получен ответ от сервера:", response);
        if (!response.ok) {
            throw new Error("Ошибка при входе");
        }
        return response.json();    
    })
    .then(data => {
        console.log("Данные авторизации получены:", data);
        console.log("Токен:", data.user.token);
        localStorage.setItem("token", data.user.token);
        setToken(data.user.token);
        setUser(data.user); 
        
        return data;
    })
     .catch(error => {
        console.error("Ошибка при входе:", error);
        if (error.message === "Ошибка при входе") {
            alert('Произошла ошибка при попытке входа. Пожалуйста, попробуйте еще раз.');
        } else {
            alert('Неверный логин или пароль');
        }
        throw error;
    });
};

export function handleSuccessfulLogin() { 
    //isAutenticated = true;
    //document.querySelector(".add-form").style.display = "flex";
    //document.querySelector(".login").style.display = "none";
    renderCommentsForm();    
    showComments();
}

let currentUser = null;

export function getUser() {
    return currentUser;
}

export function setUser(userData) {
    currentUser = userData;
}

export function clearUser() {
    currentUser = null;
}