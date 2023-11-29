import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
const port = 5173;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "macbook",
  host: "localhost",
  database: "tweet_app",
  password: "macbook",
  port: 5432,
});

// Get all tweets
app.get("/api/tweets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tweets");
    res.json({ data: { tweets: result.rows } });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

// Create a new tweet
app.post("/api/tweets", async (req, res) => {
  const { content } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tweets (content) VALUES ($1) RETURNING *",
      [content]
    );
    res.status(201).json({ data: { tweet: result.rows[0] } });
  } catch (error) {
    console.error("Error creating tweet:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
  const values = [email, password];

  try {
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      res.status(200).json({ data: { access_token: "your_access_token" } });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
