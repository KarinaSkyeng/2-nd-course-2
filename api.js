const token = "bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
localStorage.setItem("token", token);

export function getTodos(token) {
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
        body: JSON.stringify({
            login: "glebka",
            password: "123456",
             
            forceError: true,
        })           
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка при аутентификации");
        }
        return response.json();
    })
    .then(data => {
        const receivedToken = data.token; // Получаем Bearer токен из ответа сервера
        console.log("Полученный токен:", receivedToken);
        // Используем полученный токен для отправки запроса на добавление комментария
        return fetch("https://wedev-api.sky.pro/api/v2/karina-korneva/comments", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`, // Устанавливаем заголовок с Bearer токеном 
            },
            body: JSON.stringify(newComment)
        });
    })
    .then((response) => {
        if (!response.ok) {
            if (response.status === 500) {
                throw new Error("Ошибка сервера");
            } else {
            throw new Error("Ошибка при добавлении комментария");
            }
        }
        return response.json();
    })
    .catch(error => {
        console.error("Ошибка:", error);
        throw error; 
    });
}