const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();

  if (title && content ) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};
  
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

const displayPostForm = async (event) => {
  event.preventDefault();

  const form = document.getElementById('post-form'); 
  const title = document.getElementById('post-title');
  const content = document.getElementById('post-content');
  const newPostButton = document.getElementById('new-post-button');

  form.classList.toggle('display-none');
  newPostButton.classList.toggle('display-none');
  title.value = "";
  content.value = "";
}

document
  .getElementById('cancel-post-button')
  .addEventListener('click', displayPostForm); 

document
  .getElementById('new-post-button')
  .addEventListener('click', displayPostForm);

document
  .getElementById('confirm-post-button')
  .addEventListener('click', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);