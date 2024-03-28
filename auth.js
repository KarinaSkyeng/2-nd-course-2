
export const login = async ({ login, password }) => {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"  
        },
        body: JSON.stringify({ login, password })
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
        setUser(data.user); 
        return data;
    })
    .catch(error => {
        console.error("Ошибка:", error);
        throw error;
    });
};

export function handleSuccessfulLogin() {
    document.querySelector(".add-form").style.display = "block";
    // Вызываем функцию добавления комментария
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