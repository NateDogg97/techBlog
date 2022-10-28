const newCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.getElementById('comment-content').value.trim();
  const id = event.target.getAttribute('data-post-id');

  if (!content) {
    return;
  }
    
  const response = await fetch(`/api/posts/comments/${id}`, {
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

document.addEventListener('click', e => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  const content = document.getElementById('comment-content');
  const newPostButton = document.getElementById('new-comment-button');

  if(!isDropdownButton && e.target.closest('[data-dropdown]')) return;

  let currentDropdown;
  if(isDropdownButton) {
    currentDropdown = e.target.closest('[data-dropdown]');
    currentDropdown.classList.toggle('active');
    newPostButton.classList.toggle('opacity-0');
    newPostButton.classList.toggle('opacity-1');
    content.value = "";
  }
});

const formDropdown = async (e) => {

  document.querySelectorAll('.comment-container').forEach(item => {
    const a = item.getAttribute('data-translate');

  if(e.target.id === 'new-comment-button'){
      const b = parseFloat(a) + parseFloat(230);
      item.setAttribute('style', `transform: translateY(${b}px);`);
      item.setAttribute('data-translate', `${b}`);
    }
  if (e.target.id === 'cancel-comment-button'){
      const b = parseFloat(a) - parseFloat(230);
      item.setAttribute('style', `transform: translateY(${b}px);`);
      item.setAttribute('data-translate', `${b}`);
    }
  }) 
}

//--------------------------------------------------------------------------------------------------------------------//
// This function changes the buttons' innerHTML and classList to "Post", "Cancel" and "post-comment", "cancel-comment"//
//--------------------------------------------------------------------------------------------------------------------//
const changeEdit = async (event) => {
  event.preventDefault();

  if(!event.target.classList.contains('edit-comment')){
    return;

  } else {

    const id = event.target.getAttribute('data-id');
    const deleteButton = document.getElementById(`delete-comment-${id}`);
    const editButton = document.getElementById(`edit-comment-${id}`);
    var editArea = document.getElementById(`edit-area-${id}`);
    const saved = editArea.defaultValue;

    if (editArea.disabled){
      editArea.disabled = false;
      editButton.innerHTML = "Post";    
      editButton.classList.remove('edit-comment');
      editButton.classList.add('post-comment');
      deleteButton.innerHTML = "Cancel";
      deleteButton.classList.remove('delete-comment');
      deleteButton.classList.add('edit-comment');
      newButtonsHandler();
    } else {
      editArea.disabled = true;
      editArea.value = saved;
      editButton.innerHTML = "Edit";
      editButton.classList.remove('post-comment');
      editButton.classList.add('edit-comment');           
      deleteButton.innerHTML = "Delete"; 
      deleteButton.classList.remove('edit-comment');
      deleteButton.classList.add('delete-comment');
      newButtonsHandler();           
    }    
  }    
}

//------------------------------------------------------------------------------------------------//
// This function is attached to the new "Post" button and handles the 'PUT' request of the comment//
//------------------------------------------------------------------------------------------------//
const editCommentHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');
  const content = document.getElementById(`edit-area-${id}`).value;
  const postId = document.querySelector('.blogPost').getAttribute('data-post-id');

  const response = await fetch(`/api/posts/comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ content }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/posts/${postId}`);
  } else {
    alert('Failed to delete comment');
  }

}

//---------------------------------------------------------------------------------//
// This function adds Event Listeners to the new buttons.                          //
// "Post" is assigned editCommentHandler() while "Cancel" is assigned changeEdit() //
//---------------------------------------------------------------------------------//
const newButtonsHandler = () => {

  const id = document.querySelector('.edit-comment').getAttribute('data-id');
  const edit = document.getElementById(`edit-comment-${id}`);
  const del = document.getElementById(`delete-comment-${id}`);

  if(!edit.classList.contains('edit-comment')) {

    edit.addEventListener('click', editCommentHandler);
    del.addEventListener('click', changeEdit);

  } else {
    
    edit.removeEventListener('click', editCommentHandler);
    del.removeEventListener('click', changeEdit);

  }

}

const deleteComment = async (event) => {
  event.preventDefault();

  if (!event.target.classList.contains('delete-comment')){
    return;
  }

  const id = event.target.getAttribute('data-id');
  const postId = document.getElementById('post-comment-button').getAttribute('data-post-id');

  const response = await fetch(`/api/posts/comments/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/posts/${postId}`);
  } else {
    alert('Failed to delete comment');
  }
}

document
  .getElementById('post-comment-button')
  .addEventListener('click', newCommentHandler);

const deleteCommentButtons = document.getElementsByClassName('delete-comment');

for (let i=0; i < deleteCommentButtons.length; i++) {
  deleteCommentButtons[i].addEventListener('click', deleteComment);
}

const changeEditButtons = document.getElementsByClassName('edit-comment');

for (let i=0; i < changeEditButtons.length; i++) {
  changeEditButtons[i].addEventListener('click', changeEdit);
}

const newCommentButtons = document.getElementsByClassName('newComment-button');

for (let i=0; i < newCommentButtons.length; i++) {
  newCommentButtons[i].addEventListener('click', formDropdown);
}