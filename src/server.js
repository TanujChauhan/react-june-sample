import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const articlesInfo = {
    'learn-react': {
        upvotes: 0,
        comments: []
    },
    'learn-node': {
        upvotes: 0,
        comments: []
    },
    'my-thoughts-on-resumes': {
        upvotes: 0,
        comments: []
    },
}

const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

// app.get('/hello', (req, res) => res.send('Hello!'));
// app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}!`)); 

// app.post('/hello', (req, res) => {
//     console.log(req.bod); 
//     res.send(`Hello ${req.body.name}!`)
// });

app.get('/api/articles/:name', (req, res) => {
    const articleName = req.params.name;
    res.status(200).send(articlesInfo[articleName]);
});

app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name;
    articlesInfo[articleName].upvotes += 1;
    res.status(200).json(articlesInfo[articleName]);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;
    articlesInfo[articleName].comments.push({ username, text });
    res.status(200).send(articlesInfo[articleName]);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(8001, () => console.log('Listening on port 8001'));
