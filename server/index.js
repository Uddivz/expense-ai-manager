const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes'); // <-- important line

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect route
app.use('/api', routes); // now /api/predict will work

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
