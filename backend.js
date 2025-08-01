const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/comments", (req, res) => {
  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      return res.json([]);
    }
    res.json(JSON.parse(data));
  });
});

app.post("/comments", (req, res) => {
  const newComment = req.body;
  fs.readFile("comments.json", "utf8", (err, data) => {
    let comments = [];
    if (!err) {
      comments = JSON.parse(data);
    }
    comments.push(newComment);
    fs.writeFile("comments.json", JSON.stringify(comments, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving comment");
      res.status(200).send("Comment saved");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






// const express = require('express');
// const fs = require('fs');
// const app = express();
// const PORT = 3000;

// app.use(express.json());
// app.use(express.static('public'));

// const FILE_PATH = 'comments.json';

// let posts = [];
// if (fs.existsSync(FILE_PATH)) {
//     const data = fs.readFileSync(FILE_PATH, 'utf8');
//     try {
//         posts = JSON.parse(data);
//     } catch {
//         posts = [];
//     }
// }

// app.post('/posts', (req, res) => {
//     const newPost = { text: req.body.text, comments: [] };
//     posts.push(newPost);
//     savePosts();
//     res.sendStatus(201);
// });

// app.post('/posts/:id/comments', (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const comment = req.body.comment;
//     if (posts[id]) {
//         posts[id].comments.push(comment);
//         savePosts();
//         res.sendStatus(201);
//     } else {
//         res.sendStatus(404);
//     }
//  });

//  function savePosts() {
//     fs.writeFileSync(FILE_PATH, JSON.stringify(posts, null, 2));
// }

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
