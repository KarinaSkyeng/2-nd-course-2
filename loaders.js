export function toggleAddingCommentMessage(show) {
    const addingCommentMessage = document.getElementById("adding-comment-message");
    const addButton = document.querySelector(".add-form-button");

    if (addButton) { // Проверяем, существует ли кнопка
        if (show) {
            addingCommentMessage.style.display = "block";
            addButton.style.display = "none";
        } else {
            addingCommentMessage.style.display = "none";
            addButton.style.display = "block";
        }
    }
}



