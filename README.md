<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Authors for Authors</title>
    <style>
        body {
            background-color: #ffe4ec;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        h1 {
            text-align: center;
            color: #b30059;
            margin: center;
        }
        .container {
            max-width: 400px;
            margin: 40px auto;
            background: #fff0f6;
            padding: 24px 32px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(179,0,89,0.08);
        }
        label {
            display: block;
            margin-bottom: 10px;
            color: #4d004d;
            font-weight: bold;
        }
        input, textarea {
            width: 100%;
            padding: 8px;
            margin: 8px 0 16px 0;
            border: 1px solid #b30059;
            border-radius: 6px;
            font-size: 1em;
            background: #fff;
        }
        button {
            background-color: #b30059;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1em;
        }
        button:hover {
            background-color: #99004d;
        }
        .post {
            background: #fff0f6;
            padding: 16px;
            margin: 16px 0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(179,0,89,0.1);
        }
        .post strong {
            color: #b30059;
        }
        .comment {
            background: #fff;
            border-radius: 6px;
            padding: 6px 10px;
            margin: 6px 0;
            font-size: 0.9em;
            color: #4d004d;
            border-left: 3px solid #b30059;
        }
        .comment-form {
            display: flex;
            gap: 6px; 
            margin-top: 18px;
        }
        .comment-form input {
            flex: 1;
            padding: 6px;
            border: 1px solid #b30059;
            border-radius: 4px;
            font-size: 0.9em;
        }
        .comment-form button {
            background: #b30059;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 6px 12px;
            cursor: pointer;
            font-size: 1em;     
        }
        .comment-form button:hover {
            background: #99004d;
        }
    </style>
</head>
<body>
    <div style="display: flex; justify-content: flex-start; align-items: center; padding: 18px 0 0 32px;">
        <button id="authBtn" style="background:#b30059;color:#fff;border:none;border-radius:6px;padding:8px 18px;font-size:1em;cursor:pointer;">
            Sign In / Create Account
        </button>
    </div>
    <h1>Authors for Authors</h1>
    <p style="text-align: center; color: #4d004d;">A platform for authors to connect and collaborate.</p>
    <div class="container">
        <form id="postForm">
            <label for="name">Your Name</label>
            <input type="text" id="name" required placeholder="Enter your name">
            <label for="message">Your Message</label>
            <textarea id="message" rows="4" required placeholder="Write your message"></textarea>
            <button type="submit">Post</button>
        </form>
        <div id="posts"></div>
    </div>

    <script>
        const form = document.getElementById('postForm');
        const postsDiv = document.getElementById('posts');
        function createCommentForm(postDiv) {
        const commentForm = document.createElement('form');
        commentForm.className = 'comment-form';
        commentForm.innerHTML = `
            <input type="text" class="comment-name" required placeholder="Your name">
            <input type="text" class="comment-message" required placeholder="Write a comment">
            <button type="submit">Comment</button>
        `;
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = commentForm.querySelector('.comment-name').value.trim();
            const message = commentForm.querySelector('.comment-message').value.trim();
            if (name && message) {
                const now = new Date();
                const dateString = now.toLocaleString();
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `<strong>${name}</strong>: ${message}
                    <span style="font-size:0.85em;color:#888;"> (${dateString})</span>`;
                postDiv.querySelector('.comments').appendChild(commentDiv);
                commentForm.reset();
            }
        });
        return commentForm;
    }

    document.getElementById('authBtn').onclick = function() {
        window.location.href = "LogIn.html";
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        if (name && message) {
            const post = document.createElement('div');
            post.className = 'post';
            const now = new Date();
            const dateString = now.toLocaleString();
            post.innerHTML = `
                <strong>${name}</strong><br>${message}<br>
                <span style="font-size:0.9em;color:#888;">${dateString}</span>
                <div class="comments" style="margin-top:12px;"></div>
            `;
            post.appendChild(createCommentForm(post));
            postsDiv.prepend(post);
            form.reset();
        }
    });
    
    </script>
</body>
</html>

