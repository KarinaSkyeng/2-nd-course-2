
import { getCurrentDateTime } from "./helpers.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { nameElement, textElement } from "./main.js";

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