app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  if (comment) {
    comments.push(comment);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get('/comments', (req, res) => {
  res.json(comments);
});

async function loadPosts() {
  const res = await fetch('/posts');
  const posts = await res.json();
  const container = document.getElementById('posts');
  container.innerHTML = '';

  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.innerHTML = `
      <p><strong>Post:</strong> ${post.text}</p>
      <ul>${post.comments.map(c => `<li>${c}</li>`).join('')}</ul>
      <input type="text" id="comment-${index}" placeholder="Add a comment" />
      <button onclick="addComment(${index})">Comment</button>
      <hr />
    `;
    container.appendChild(postDiv);
  });
}

async function submitPost() {
    const text = document.getElementById('postText').value;
    await fetch('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    document.getElementById('postText').value = '';
    loadPosts();
}

async function addComment(index) {
  const input = document.getElementById(`comment-${index}`);
  const comment = input.value;
  if (!comment) return;

  await fetch(`/posts/${index}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment })
  });
  input.value = '';
  loadPosts();
}

loadPosts();
