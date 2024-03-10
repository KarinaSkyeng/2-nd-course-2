import { postTodo, getTodos } from "./api.js";
import { sanitizeHtml } from "./sanitizeHtml.js";

document.addEventListener("DOMContentLoaded", () => {
    loadCommentsFromAPI();
});

// Переменные для сохранения введенных данных
let enteredName = "";
let enteredText = "";

// Найти элементы формы
const nameElement = document.querySelector(".add-form-name");
const textElement = document.querySelector(".add-form-text");
const buttonElement = document.querySelector(".add-form-button");
const commentsList = document.querySelector(".comments");

// Функция для загрузки списка комментариев из API
function loadCommentsFromAPI() {
    // Показываем сообщение о загрузке
    document.getElementById("loading-message").style.display = "block";

    
    getTodos().then((data) => {             
            // Скрываем сообщение о загрузке после загрузки комментариев
            document.getElementById("loading-message").style.display = "none";

            // Обновляем отображение комментариев на странице
            renderComments(data.comments);
        })
        .catch((error) => {
            console.error("Ошибка при добавлении комментария:", error);
            // Обработка ошибок
            if (error && error.message === "Ошибка при загрузке комментариев") {
                console.log("Ошибка 500:", error.message);
                alert("Не удалось загрузить комментарии.");
            } else if (error && error.message === "Ошибка 500: Внутренняя ошибка сервера") {
                alert("Произошла ошибка при загрузке комментариев.");
            }  else {
                alert("Серверная ошибка");
        } 

            // Скрываем сообщение о загрузке в случае ошибки
            document.getElementById("loading-message").style.display = "none";

            // Отображаем заглушку
            document.querySelector(".comments").innerHTML = "<li>Не удалось загрузить комментарии</li>";
        });
}

function toggleAddingCommentMessage(show) {
    const addingCommentMessage = document.getElementById("adding-comment-message");
    const addButton = document.querySelector(".add-form-button");

        if (show) {
            addingCommentMessage.style.display = "block";
            addButton.style.display = "none";
        } else {
            addingCommentMessage.style.display = "none";
            addButton.style.display = "block";
        }
}

// Функция для добавления комментария в список и обновления отображения
function addComment() {
    const name = nameElement.value.trim();
    const text = textElement.value.trim();

        if (!name || !text) {
            highlightEmptyFields();
            return;
        }

    // Сохраняем введенные данные
    enteredName = name;
    enteredText = text;

    toggleAddingCommentMessage(true);

    const newComment = {
        name: name,
        text: text,
        forceError: true,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(newComment),
        // Установка параметра forceError: true для получения 500-й ошибки
        forceError: true,
    };

   
        postTodo().then((data) => {
            nameElement.value = "";
            textElement.value = "";
            // Загружаем комментарии после успешного добавления
            loadCommentsFromAPI();                                               
        }) 
        .catch((error) => {
            console.error("Ошибка при добавлении комментария:", error);
            // Обработка ошибок 400-го уровня
            if (error && error.message === "Ошибка при добавлении комментария") {
                console.log("Ошибка 400:", error.message);
                alert("Имя и комментарий должны содержать не менее 3 символов.");
            }
        })
                   
        .finally(() => {
            toggleAddingCommentMessage(false); // Скрываем сообщение о добавлении комментария
        });
}

// Обработчик события для кнопки "Написать"
buttonElement.addEventListener("click", addComment);

// Функция для отрисовки всех комментариев
function renderComments(comments) {
    commentsList.innerHTML = "";

    comments.forEach((comment, index) => {
        const commentElement = createCommentElement(
            comment.author.name,
            comment.text,
            comment.date,
            comment.likes,
            comment.liked
        );

        commentsList.appendChild(commentElement);

        const likeButton = commentElement.querySelector(".like-button");
        likeButton.dataset.commentIndex = index;

        likeButton.addEventListener("click", () => {
            updateLikesState(likeButton, index, comments);
        });
    });
}

// Функция для обновления состояния лайка
function updateLikesState(likeButton, commentIndex, comments) {
    const comment = comments[commentIndex];

    comment.liked = !comment.liked;

    if (comment.liked) {
        comment.likes++;
    } else {
        comment.likes--;
    }

    renderComments(comments);
}

// Функция для создания элемента комментария
function createCommentElement(name, text, date, likes, liked) {
    const formattedDate = getCurrentDateTime();
    const comment = document.createElement("li");
    comment.classList.add("comment");

    const commentHTML = `
      <div class="comment-header">
        <div>${sanitizeHtml(name)}</div>
        <div>${formattedDate}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${sanitizeHtml(text)}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${likes}</span>
          <button class="like-button ${liked ? "-active-like" : ""}"></button>
        </div>
      </div>
    `;

    comment.innerHTML = commentHTML;

    return comment;
}

// Функция для подсветки пустых полей
function highlightEmptyFields() {
    if (!nameElement.value.trim()) {
        nameElement.classList.add("error");
    } else {
        nameElement.classList.remove("error");
    }
    if (!textElement.value.trim()) {
        textElement.classList.add("error");
    } else {
        textElement.classList.remove("error");
    }
}

// Функция для сброса стилей валидации
function resetValidation() {
    nameElement.classList.remove("error");
    textElement.classList.remove("error");
}

// Обработчик события при вводе текста в поля ввода
nameElement.addEventListener("input", resetValidation);
textElement.addEventListener("input", resetValidation);
 

  // Функция для получения текущей даты и времени
function getCurrentDateTime() {
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date().toLocaleString("ru-RU", options).replace(",", "");
}