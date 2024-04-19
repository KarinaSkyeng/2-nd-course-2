export let token = localStorage.getItem("token");

export function setToken(newToken) {
    localStorage.setItem("token", newToken);
    console.log(token);
    token = newToken;
}

export async function getToken() {
    return new Promise((resolve, reject) => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            resolve(storedToken);
        } else {
            reject("Токен не найден в localStorage");
        }
    });
}

export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v2/karina-korneva/comments", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка при получении комментария");
            } 
                return response.json();                                            
    })
    .catch(error => {
        console.error("Ошибка:", error);
        throw error;
    });
}

export function postTodo(newComment) {
    return fetch("https://wedev-api.sky.pro/api/v2/karina-korneva/comments", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newComment) 
    })        
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка при отправке комментария");
        }
        return response.json();
    })    
    .catch(error => {
        console.error("Ошибка при добавлении комментария:", error);
        if (error && error.message === "Ошибка при отправке комментария") {
            console.log("Ошибка 400:", error.message);
            alert("Имя и комментарий должны содержать не менее 3-х символов.");
        } 
        throw error; 
    });
}
