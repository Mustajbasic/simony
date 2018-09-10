const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const IndexRouter = require('./routes/index.router');

// const PORT = process.argv[2];
const PORT = 5000;
// require('./utils/prefill');
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use('/api', IndexRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
