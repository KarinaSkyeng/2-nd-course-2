import { addComment } from "./comments.js";
import { getCurrentDateTime } from "./helpers.js";
import { sanitizeHtml } from "./sanitizeHtml.js";

export function renderComments(comments) {
    const commentsList = document.querySelector(".comments");
    commentsList.innerHTML = "";

    comments.forEach((comment) => {        
        const commentElement = createCommentElement(
            comment.author.name,
            comment.text,
            comment.date,
            comment.likes,
            comment.liked
        );

        commentsList.appendChild(commentElement);

        const likeButton = commentElement.querySelector(".like-button");
        likeButton.dataset.commentIndex = comments.indexOf(comment).toString();

        likeButton.addEventListener("click", () => {
            updateLikesState(likeButton, comments);
        });
    });
    addComment()
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

  // Проверяем, что клик был на комментарии или на одном из его дочерних элементов
  const commentElement = clickedElement.closest(".comment");
  if (commentElement) {
    // Проверяем, что клик не был на кнопке лайка
    if (!clickedElement.classList.contains("like-button")) {
      const name = commentElement.querySelector(".comment-header div:first-child").textContent; 
      const text = commentElement.querySelector(".comment-text").textContent; 

      // Подставляем имя и текст комментария в форму добавления комментария
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

