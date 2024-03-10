export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/karina-korneva/comments")
    .then((response) => {
        if (!response.ok) {
            if (response.status === 500) {
                throw new Error("Ошибка 500: Внутренняя ошибка сервера");
            } else {
                throw new Error("Ошибка при добавлении комментария");
            }
        }
        return response.json();
    });
}

export function postTodo() {
    return  fetch("https://wedev-api.sky.pro/api/v1/karina-korneva/comments", options)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Ошибка при добавлении комментария");
        }
        return response.json();
    });
}