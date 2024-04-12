import { add, format } from 'date-fns';
//import { getCurrentDateTime } from "./helpers.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
//import { nameElement, textElement } from "./main.js";
import { login, handleSuccessfulLogin } from "./auth.js";
import { addComment } from "./comments.js";
import { getTodos, token } from "./api.js"

let commentsList;
let isAuthenticated = false;

export function renderComments(comments,) {
  const app = document.getElementById('app');

  const addFormHTML = `
  <div class="add-form">
  <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
  />
  <textarea
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш комментарий"
      rows="4"
  ></textarea>
  <div class="add-form-row">
      <button class="add-form-button">Написать</button>
      <div id="adding-comment-message" style="display: none;">Комментарий добавляется...</div>
  </div>
</div>
`;

app.innerHTML = `
<ul class="comments"></ul>
${token ? addFormHTML : ` <div class="add-authorization" id="auth-message">Чтобы добавить комментарий, <span class="link-login" id="login-link">авторизуйтесь</span>.</div>`}
`;
    commentsList = document.querySelector(".comments");
    commentsList.innerHTML = ""; 
  
    comments.forEach((comment) => { 
      const createDate = new Date(comment.date);
      const formattedDate = format(createDate, 'yyyy-MM-dd HH.mm.ss'); 
      const commentElement = createCommentElement(
            comment.author.name,
            comment.text,
            formattedDate,
            comment.likes,
            comment.liked,           
        );

        commentsList.appendChild(commentElement);

        const likeButton = commentElement.querySelector(".like-button");
        likeButton.dataset.commentIndex = comments.indexOf(comment).toString();

        likeButton.addEventListener("click", () => {
            updateLikesState(likeButton, comments);            
        });
    }); 
    
    addComment(token);
    renderButtonAuth(token);
}

// Функция для отображения списка комментариев
export function showComments(token) {
    getTodos().then((data) => {    
      renderComments(data.comments, token);   
  });
}

function renderButtonAuth() {
  if(token) {
    return
  }
  document.getElementById("login-link").addEventListener("click", () => {
    renderLoginForm();
  });
}

// Функция для отображения формы авторизации
export function renderLoginForm() {
  const app = document.getElementById('app')

  const loginHTML = `
  <div class="login-form">
      <input class="login-input-pass" type="text" id="username" placeholder="Логин">
      <input class="login-input-pass" type="password" id="password-login" placeholder="Пароль">
      <button class="button-login" id="login-button">Войти</button>
  </div>
  `;

  app.innerHTML = loginHTML;

  // Добавляем обработчик события на кнопку "Войти"
document.querySelector('#login-button').addEventListener("click", async () => {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password-login").value;

  // Проверка на корректность данных
  if (username.trim() === '' || password.trim() === '') {
    alert('Пожалуйста, введите логин и пароль');
    return; // Прерываем выполнение кода
  }

  try {
      console.log("Отправляем данные на сервер для входа:", username, password);
      await login({ login: username, password });
      handleSuccessfulLogin();
      isAuthenticated = true;
  } 
  catch (error) {
        console.error("Ошибка при входе:", error);
      
        if (error.message === "Неверные учетные данные") {
          alert('Произошла ошибка при попытке входа. Пожалуйста, попробуйте еще раз.');
      } else {
          alert('Неверный логин или пароль');
      }
    }
  }) 
}  

function createCommentElement(name, text, formattedDate, likes, liked) {  
    //const formattedDate = getCurrentDateTime(date);
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

     // Проверяем статус авторизации пользователя
     if (!isAuthenticated) {
      alert("Пожалуйста, авторизуйтесь, чтобы поставить лайк.");
      return; // Прерываем выполнение функции, если пользователь не авторизован
  }

    comment.liked = !comment.liked;

    if (comment.liked) {
        comment.likes++;
    } else {
        comment.likes--;
    }

    renderComments(comments);
  }