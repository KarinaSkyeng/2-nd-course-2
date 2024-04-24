import { setToken } from "./api.js";

import { showComments, renderLoginForm, renderRegistrationForm } from "./render.js";

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
    renderLoginForm();    
    showComments();
}

export function getUser() {
    return JSON.parse(localStorage.getItem("data"));
}

export function setUser(userData) {
    localStorage.setItem("data", JSON.stringify(userData));
}

export function clearUser() {
    localStorage.removeItem("data");
}

const userData = {
    name: 'Ваше имя',
    login: 'Ваш логин',
    password: 'Ваш пароль'
};


export async function registerUser(userData) {
    try {
        const response = await fetch('https://wedev-api.sky.pro/api/user', {
            method: 'POST',            
            body: JSON.stringify(userData)
        });
        
        if (response.status === 201) {
            const responseData = await response.json();
            console.log('Пользователь успешно зарегистрирован:', responseData.user);
            // Здесь вы можете выполнить дополнительные действия после успешной регистрации
        } else if (response.status === 400) {
            throw new Error('Пользователь с таким логином уже существует.');
        } else {
            throw new Error('Произошла ошибка при регистрации.');
        }
    } catch (error) {
        console.error('Ошибка регистрации:', error.message);
        throw error;
    }
}

export function handleSuccessfulRegistration() {
    // Вызываем функцию для отображения формы регистрации
    renderRegistrationForm();
}
