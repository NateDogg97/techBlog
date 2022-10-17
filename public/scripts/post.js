const newCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.getElementById('comment-content').value.trim();

    if (!content) {
      return;
    }
    
    const response = await fetch(`api/posts/comment/:id`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },        
    });

    if (response.ok) {
      document.location.replace('/posts/:id');
    } else {
      alert('Failed to post comment');
    }
}

const displayCommentForm = async (event) => {
  event.preventDefault();

  const form = document.getElementById('new-comment-form');
  const content = document.getElementById('comment-content');

  form.classList.toggle('display-none');
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