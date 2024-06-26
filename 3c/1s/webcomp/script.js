class CommentElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      const template = document.getElementById('comment-template');
      const templateContent = template.content.cloneNode(true);
  
      this.shadowRoot.appendChild(templateContent);
  
      this.replyButton = this.shadowRoot.querySelector('.reply');
      this.deleteButton = this.shadowRoot.querySelector('.delete');
      this.nestedComments = this.shadowRoot.querySelector('.nested-comments');
  
      this.replyButton.addEventListener('click', this.handleReply.bind(this));
      this.deleteButton.addEventListener('click', this.handleDelete.bind(this));
    }
  
    handleReply() {
      const author = prompt('Enter your name:');
      const text = prompt('Enter your comment:');
      if (author && text) {
        const newComment = document.createElement('comment-element');
        newComment.innerHTML = `
          <span slot="author">${author}</span>
          <span slot="text">${text}</span>
        `;
        this.nestedComments.appendChild(newComment);
      }
    }
  
    handleDelete() {
      this.remove();
    }
  }
  
  customElements.define('comment-element', CommentElement);
  
  // Добавление начальных комментариев
  const commentsSection = document.getElementById('comments-section');
  
  const initialComments = [
    { author: 'User1', text: 'This is the first comment' },
    { author: 'User2', text: 'This is the second comment' }
  ];
  
  initialComments.forEach(comment => {
    const commentElem = document.createElement('comment-element');
    commentElem.innerHTML = `
      <span slot="author">${comment.author}</span>
      <span slot="text">${comment.text}</span>
    `;
    commentsSection.appendChild(commentElem);
  });
  