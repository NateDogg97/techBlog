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
    newPostButton.classList.toggle('opacity-1');
    title.value = "";
    content.value = "";
  }
});

document.addEventListener('click', e => {
  const isDropdownButton = e.target.matches("[data-dropdown-button-2]");

  if(!isDropdownButton && e.target.closest('[data-dropdown-2]')) return;

  let currentDropdown;
  if(isDropdownButton) {
    currentDropdown = e.target.closest('[data-dropdown-2]');
    currentDropdown.classList.toggle('active');
  }

});

function assignDataPost() {
  document.querySelectorAll('.myPosts').forEach(function(post, index) {
    post.setAttribute('data-post', index + 1);
  })
}

const formDropdown = async (e) => {

  document.querySelectorAll('.myPosts').forEach(item => {
    const a = item.getAttribute('data-translate');

  if(e.target.id === 'new-post-button'){
      const b = parseFloat(a) + parseFloat(405);
      item.setAttribute('style', `transform: translateY(${b}px);`);
      item.setAttribute('data-translate', `${b}`);
    }
  if (e.target.id === 'cancel-post-button'){
      const b = parseFloat(a) - parseFloat(405);
      item.setAttribute('style', `transform: translateY(${b}px);`);
      item.setAttribute('data-translate', `${b}`);
    }
  }) 
}

const postDropdown = async (e) => {
  e.preventDefault();

  const n = e.target.closest('[data-post]').getAttribute('data-post');
  const p = document.querySelectorAll('.myPosts');

  if(e.target.innerHTML === 'Edit'){

    for(let i=parseInt(n); i < p.length; i++) {

      const x = p[i].getAttribute('data-translate');
      p[i].setAttribute('data-translate', parseInt(x) - parseInt(400));
      const y = p[i].getAttribute('data-translate');
      p[i].setAttribute('style', `transform: translateY(${y}px);`);
    }    

  } else {

    for(let i=parseInt(n); i < p.length; i++) {

      const x = p[i].getAttribute('data-translate');
      p[i].setAttribute('data-translate', parseInt(x) + parseInt(400));
      const y = p[i].getAttribute('data-translate');
      p[i].setAttribute('style', `transform: translateY(${y}px);`);
    }

  }
}

const displayEditForm = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute(`data-id`);
  // const form = document.getElementById(`edit-post-form-${id}`); 
  var title = document.getElementById(`edit-title-${id}`);
  var content = document.getElementById(`edit-content-${id}`);
  const editButton = document.getElementById(`edit-post-${id}`);
  const savedTitle = title.defaultValue;
  const savedContent = content.defaultValue;
  
  ;
  title.value = savedTitle;
  content.value = savedContent;

  if(editButton.innerHTML !== "Edit") {
    editButton.innerHTML = "Edit"
  } else {
    editButton.innerHTML = "Cancel"
  }
}

assignDataPost();

document
  .getElementById('confirm-post-button')
  .addEventListener('click', newFormHandler);

const newPostButtons = document.getElementsByClassName('newPost-button');

for (let i=0; i < newPostButtons.length; i++) {
  newPostButtons[i].addEventListener('click', formDropdown);
}

const deletePostButtons = document.getElementsByClassName('delete-post-button');

for (let i=0; i < deletePostButtons.length; i++) {
  deletePostButtons[i].addEventListener('click', delButtonHandler);
}

const editButtons = document.getElementsByClassName('edit-post');

for (let i=0; i < editButtons.length; i++) {
  editButtons[i].addEventListener('click', displayEditForm);
}

for (let i=0; i < editButtons.length; i++) {
  editButtons[i].addEventListener('click', postDropdown);
}

const cancelEditButtons = document.getElementsByClassName('cancel-edit-button');

for (let i=0; i < cancelEditButtons.length; i++) {
  cancelEditButtons[i].addEventListener('click', displayEditForm);
}

const newEdit = document.getElementsByClassName('new-edit-button');

for (let i=0; i < newEdit.length; i++) {
  newEdit[i].addEventListener('click', editFormHandler);
}