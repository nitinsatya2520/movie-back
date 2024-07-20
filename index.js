const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Sample movie data
const movies = [
  { id: 1, title: 'The Matrix', description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.', duration: '136 mins' },
  { id: 2, title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.', duration: '148 mins' },
  { id: 3, title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', duration: '169 mins' },
  { id: 4, title: 'Kalki 2898 AD', description: 'Bhairava, tired of the oppressive confines of his homeland and the perilous life of a bounty hunter, yearns for a more comfortable existence in the Complex. His quest for a new life inadvertently entangles him with a group of rebels dedicated to freeing humanity from the grip of malevolent forces.', duration: '181 mins' },
  { id: 5, title: 'RRR', description: 'A fictional history of two legendary revolutionaries journey away from home before they began fighting for their country in the 1920s.', duration: '154 mins' },
];

// Sample booked seats data with cost information
const bookedSeats = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
};

// Define the total number of seats per movie
const TOTAL_SEATS = 25;

// Endpoint to get the list of movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// Endpoint to get booked seats for a specific movie
app.get('/api/booked-seats/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const seats = bookedSeats[id] || [];
  res.json(seats);
});

// Endpoint to get available seats for a specific movie
app.get('/api/available-seats/:movieId', (req, res) => {
  const movieId = parseInt(req.params.movieId, 10);
  const bookedSeatsForMovie = bookedSeats[movieId] || [];
  const availableSeats = TOTAL_SEATS - bookedSeatsForMovie.length;
  res.json({ availableSeats });
});

// Endpoint to get a specific movie's details
app.get('/api/movie/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const movie = movies.find(m => m.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Endpoint to book seats for a specific movie
app.post('/api/book', (req, res) => {
  const { id, seats } = req.body;
  if (!bookedSeats[id]) bookedSeats[id] = [];
  bookedSeats[id] = [...new Set([...bookedSeats[id], ...seats])]; // Avoid duplicates
  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
