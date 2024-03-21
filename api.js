export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/karina-korneva/comments")
    .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка при добавлении комментария");
            } 
                return response.json();
                                            
    })
}

export function postTodo(newComment) {
    return fetch("https://wedev-api.sky.pro/api/v1/karina-korneva/comments", {
        method: "POST",
        body: JSON.stringify(newComment),            
        forceError: true,
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
}