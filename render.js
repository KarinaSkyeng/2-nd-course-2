
import { getCurrentDateTime } from "./helpers.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { nameElement, textElement } from "./main.js";
import { login, handleSuccessfulLogin } from "./auth.js";

let commentsList;

export function renderComments(comments) {
    commentsList = document.querySelector(".comments");
    commentsList.innerHTML = "";

    comments.forEach((comment) => {        
        const commentElement = createCommentElement(
            comment.author.name,
            comment.text,
            comment.date,
            comment.likes,
            comment.liked,
            nameElement, 
            textElement
        );

        commentsList.appendChild(commentElement);

        const likeButton = commentElement.querySelector(".like-button");
        likeButton.dataset.commentIndex = comments.indexOf(comment).toString();

        likeButton.addEventListener("click", () => {
            updateLikesState(likeButton, comments);
        });
    });    
}

// Функция для отображения формы авторизации
export function renderLoginForm() {
  const loginElement = document.createElement("div");
  loginElement.classList.add("login");

  const loginHTML = `
  <div class="login-form">
      <input class="login-input-pass" type="text" id="username" placeholder="Логин">
      <input class="login-input-pass" type="password" id="password-login" placeholder="Пароль">
      <button class="button-login" id="login-button">Войти</button>
  </div>
  `;

  loginElement.innerHTML = loginHTML;

  document.querySelector(".add-form").style.display = "none";

  // Вставляем форму авторизации перед словом "авторизуйтесь"
  const authMessage = document.getElementById("auth-message");
  authMessage.parentNode.insertBefore(loginElement, authMessage);
// Добавляем обработчик события на кнопку "Войти"
loginElement.querySelector('#login-button').addEventListener("click", async () => {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password-login").value;

  try {
      console.log("Отправляем данные на сервер для входа:", username, password);
      await login({ login: username, password });
      handleSuccessfulLogin();// Обработка успешной аутентификации
  } catch (error) {
      console.error("Ошибка при входе:", error);
      // Обработка ошибки входа
  }
});
}

function createCommentElement(name, text, date, likes, liked) {
    const formattedDate = getCurrentDateTime(date);
    const commentElement = document.createElement("li");
    commentElement.classList.add("comment");

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

    commentElement.innerHTML = commentHTML;

  
    // Обработчик события клика на комментарий
commentsList.addEventListener("click", function(event) {
  const clickedElement = event.target;

  const commentElement = clickedElement.closest(".comment");
  if (commentElement) {    
    if (!clickedElement.classList.contains("like-button")) {
      const name = commentElement.querySelector(".comment-header div:first-child").textContent; 
      const text = commentElement.querySelector(".comment-text").textContent; 

      nameElement.value = name;
      textElement.value = `@${name}, ${text}`; 
    }
  }
});

    return commentElement;
}

function updateLikesState(likeButton, comments) {
  const commentIndex = parseInt(likeButton.dataset.commentIndex);

    const comment = comments[commentIndex];

    comment.liked = !comment.liked;

    if (comment.liked) {
        comment.likes++;
    } else {
        comment.likes--;
    }

    renderComments(comments);
  }