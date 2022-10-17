const newCommentHandler = async (event) => {
  event.preventDefault();

  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();

  if (title && content) {
    const response = await fetch(`api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },      
    });
  }
}

const displayCommentForm = async (event) => {
  event.preventDefault();

  const commentForm = document.getElementById('newComment-form');
  const content = document.getElementById('comment-content').value.trim();

  if (commentForm.hasAttribute('diplay')) {
    commentForm.removeAttribute('display');
    return;

  } else if (!content){
    return;

  } else {
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



}

const hideCommentForm = async (event) => {
  event.preventDefault();

  document.getElementById('newComment-div').removeAttribute('dispaly');
  document.getElementById('newComment-form').setAttribute('dispaly', 'none');  
}

