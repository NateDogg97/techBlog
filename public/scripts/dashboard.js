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

const editFormHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');
  const title = document.getElementById(`edit-title-${id}`).value.trim();
  const content = document.getElementById(`edit-content-${id}`).value.trim();

  if(title && content) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json',
    },
  }); 
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
}
  
const delButtonHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete post');
  }

};

document.addEventListener('click', e => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  const title = document.getElementById('post-title');
  const content = document.getElementById('post-content');
  const newPostButton = document.getElementById('new-post-button');

  if(!isDropdownButton && e.target.closest('[data-dropdown]')) return;

  let currentDropdown;
  if(isDropdownButton) {
    currentDropdown = e.target.closest('[data-dropdown]');
    currentDropdown.classList.toggle('active');
    newPostButton.classList.toggle('opacity-0');
    newPostButton.classList.toggle('opacity-1')
    title.value = "";
    content.value = "";
  }

})

// const displayPostForm = async (event) => {
//   event.preventDefault();

//   const form = document.getElementById('post-form'); 
  const title = document.getElementById('post-title');
  const content = document.getElementById('post-content');
//   const newPostButton = document.getElementById('new-post-button');

//   form.classList.toggle('display-none');
//   newPostButton.classList.toggle('display-none');
  title.value = "";
  content.value = "";
// }

const displayEditForm = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute(`data-id`);
  const form = document.getElementById(`edit-post-form-${id}`); 
  var title = document.getElementById(`edit-title-${id}`);
  var content = document.getElementById(`edit-content-${id}`);
  const editButton = document.getElementById(`edit-post-${id}`);
  const savedTitle = title.defaultValue;
  const savedContent = content.defaultValue;
  
  form.classList.toggle('display-none');
  title.value = savedTitle;
  content.value = savedContent;

  if(editButton.innerHTML !== "Edit") {
    editButton.innerHTML = "Edit"
  } else {
    editButton.innerHTML = "Cancel"
  }
}

// document
//   .getElementById('cancel-post-button')
//   .addEventListener('click', displayPostForm); 

// document
//   .getElementById('new-post-button')
//   .addEventListener('click', displayPostForm);

document
  .getElementById('confirm-post-button')
  .addEventListener('click', newFormHandler);

const deletePostButtons = document.getElementsByClassName('delete-post-button');

for (let i=0; i < deletePostButtons.length; i++) {
  deletePostButtons[i].addEventListener('click', delButtonHandler);
}

const editButtons = document.getElementsByClassName('edit-post');

for (let i=0; i < editButtons.length; i++) {
  editButtons[i].addEventListener('click', displayEditForm);
}

const cancelEditButtons = document.getElementsByClassName('cancel-edit-button');

for (let i=0; i < cancelEditButtons.length; i++) {
  cancelEditButtons[i].addEventListener('click', displayEditForm);
}

const newEdit = document.getElementsByClassName('new-edit-button');

for (let i=0; i < newEdit.length; i++) {
  newEdit[i].addEventListener('click', editFormHandler);
}