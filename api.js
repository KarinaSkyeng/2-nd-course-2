const token = localStorage.getItem("token");

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
           /* login: "glebka",
            password: "123456",*/         
        })        
        .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка при аутентификации");
        }
        return response.json();
    })    
    .catch(error => {
        console.error("Ошибка:", error);
        throw error; 
    });
}