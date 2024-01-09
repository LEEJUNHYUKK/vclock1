function submitComment() {
    var commentList = document.getElementById('comment-list');
    var commentInput = document.getElementById('comment-input');
    
    if (commentInput.value.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }
    
    
    var commentContainer = document.createElement('div');
    commentContainer.classList.add('comment-container');
    
    
    var newComment = document.createElement('p');
    newComment.textContent = commentInput.value;
    newComment.classList.add('comment-text');
    
    
    var deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.classList.add('delete-comment');
    deleteButton.onclick = function() {
      
      commentList.removeChild(commentContainer);
    };
    
    
    commentContainer.appendChild(newComment);
    commentContainer.appendChild(deleteButton);
    
    
    commentList.appendChild(commentContainer);
    
    
    commentInput.value = '';
  }