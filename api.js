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

export async function deleteCommentFromServer(commentId) {
    try {
        const response = await fetch(`https://wedev-api.sky.pro/api/v2/karina-korneva/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` 
           },
        });
        if (response.ok) {
            console.log('Комментарий успешно удален с сервера');
            // Здесь можно выполнить какие-либо дополнительные действия, например, обновить интерфейс
        } else {
            console.error('Ошибка при удалении комментария с сервера:', response.status);
            // Обработка ошибок, если необходимо
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса на удаление комментария:', error);
        // Обработка ошибок, если необходимо
    }
}
