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

const displayCommentForm = async (event) => {
  event.preventDefault();

  const form = document.getElementById('new-comment-form');
  const content = document.getElementById('comment-content');
  const button = document.getElementById('new-comment-button');

  form.classList.toggle('display-none');
  button.classList.toggle('display-none');
  content.value = "";
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
    const content = editArea.value;
    const saved = editArea.defaultValue;

    if (editArea.disabled){
      editArea.disabled = false;
      editButton.innerHTML = "Post";    
      editButton.classList.remove('edit-comment');
      editButton.classList.add('post-comment');
      deleteButton.innerHTML = "Cancel";
      deleteButton.classList.remove('delete-comment');
      deleteButton.classList.add('edit-comment');

    } else {
      editArea.disabled = true;
      editArea.value = saved;
      editButton.innerHTML = "Edit";
      editButton.classList.remove('post-comment');
      editButton.classList.add('edit-comment');           
      deleteButton.innerHTML = "Delete"; 
      deleteButton.classList.remove('edit-comment');
      deleteButton.classList.add('delete-comment');           
    }    
  }    


  // if (event.target.hasAttribute('data-id')) {

  //   const id = event.target.getAttribute('data-id');

  //   const response = await fetch(`/api/posts/comments/${id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({ content }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if (response.ok) {
  //     document.location.replace(`/posts/${postId}`);
  //   } else {
  //     alert('Failed to delete comment');
  //   }
  // }
}

//------------------------------------------------------------------------------------------------//
// This function is attached to the new "Post" button and handles the 'PUT' request of the comment//
//------------------------------------------------------------------------------------------------//
const editCommentHandler = async (event) => {
  event.preventDefault();
}

//---------------------------------------------------------------------------------//
// This function adds Event Listeners to the new buttons.                          //
// "Post" is assigned editCommentHandler() while "Cancel" is assigned changeEdit() //
//---------------------------------------------------------------------------------//
const newButtonsHandler = async (event) => {
  event.preventDefault();
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
  .getElementById('new-comment-button')
  .addEventListener('click', displayCommentForm);

document
  .getElementById('cancel-comment-button')
  .addEventListener('click', displayCommentForm);

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