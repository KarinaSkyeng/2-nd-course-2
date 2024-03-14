import { addComment } from "./comments.js";
import { getCurrentDateTime } from "./helpers.js";
import { sanitizeHtml } from "./sanitizeHtml.js";

export function renderComments(comments) {
    const commentsList = document.querySelector(".comments");
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
    addComment()
}

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
