const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle new part request
app.post('/api/requests', (req, res) => {
  requests.push(req.body);
  console.log('New part request:', req.body);
  res.status(201).json({ message: 'Request received' });
});

// View requests as a simple HTML table
app.get('/requests', (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Part Requests - motorparts.io</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f9fafb;
        margin: 0;
        padding: 0;
        color: #333;
      }
      header {
        background-color: #007bff;
        color: white;
        padding: 1.5rem;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      main {
        max-width: 900px;
        margin: 2rem auto;
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      h1 {
        margin-bottom: 1rem;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #ddd;
        text-align: left;
      }
      th {
        background-color: #007bff;
        color: white;
        position: sticky;
        top: 0;
      }
      tr:hover {
        background-color: #f1f5f9;
      }
      footer {
        text-align: center;
        padding: 1rem;
        font-size: 0.9rem;
        color: #666;
        margin-top: 3rem;
      }
      @media (max-width: 600px) {
        table, thead, tbody, th, td, tr {
          display: block;
        }
        th {
          position: relative;
        }
        tr {
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          padding: 0.5rem;
        }
        td {
          padding-left: 50%;
          position: relative;
        }
        td::before {
          content: attr(data-label);
          position: absolute;
          left: 1rem;
          font-weight: bold;
          white-space: nowrap;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Submitted Part Requests</h1>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Vehicle</th>
            <th>Part</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (const reqItem of requests) {
    html += `
      <tr>
        <td data-label="Name">${reqItem.name}</td>
        <td data-label="Email">${reqItem.email}</td>
        <td data-label="Vehicle">${reqItem.vehicle}</td>
        <td data-label="Part">${reqItem.part}</td>
      </tr>
    `;
  }

  html += `
        </tbody>
      </table>
    </main>
    <footer>
      &copy; 2025 motorparts.io — All rights reserved.
    </footer>
  </body>
  </html>
  `;

  res.send(html);
});

// Signup route
app.post('/api/signup', (req, res) => {
  const { name, email, password, role } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ name, email, password, role });
  console.log('Registered new user:', { name, email, role });
  res.status(201).json({ message: 'Signup successful' });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', user });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
