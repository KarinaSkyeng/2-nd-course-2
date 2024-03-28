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