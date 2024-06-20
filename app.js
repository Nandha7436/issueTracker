const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://snk1311999:1ytp6gK2B4dz0kEy@nandha.zbukeuz.mongodb.net/?retryWrites=true&w=majority&appName=Nandha/issueTrackerDB', 
    {   useNewUrlParser:true,
        useUnifiedTopology: true });

// Routes
const indexRoutes = require('./routes/index');
const projectRoutes = require('./routes/projects');
const issueRoutes = require('./routes/issues');

app.use('/', indexRoutes);
app.use('/projects', projectRoutes);
app.use('/issues', issueRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
