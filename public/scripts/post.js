const newCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.getElementById('comment-content').value.trim();
  const id = event.target.getAttribute('data-post-id');

  if (!content) {
    return;
  }
    
  const response = await fetch(`api/posts/comments/${id}`, {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: {
      'Content-Type': 'application/json',
    },        
  });      

  if (response.ok) {
    document.location.replace(`/posts/${id}`);
  } else {
    alert('Failed to post comment');
  }
}

const displayCommentForm = async (event) => {
  event.preventDefault();

  const form = document.getElementById('new-comment-form');
  const content = document.getElementById('comment-content');
  const button = document.getElementById('new-comment-button');

  form.classList.toggle('display-none');
  button.classList.toggle('display-none');
  content.value = "";
}

const editComment = async (event) => {

}

const deleteComment = async (event) => {

}

document
  .getElementById('new-comment-button')
  .addEventListener('click', displayCommentForm);

document
  .getElementById('cancel-comment-button')
  .addEventListener('click', displayCommentForm);

document
  .getElementById('post-comment-button')
  .addEventListener('click', newCommentHandler);

document.getElementById('delete-comment')
  .addEventListener('click', deleteComment);

document.getElementById('edit-comment')
  .addEventListener('click', editComment);