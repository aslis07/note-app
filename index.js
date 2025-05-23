const express = require("express");
const { createClient } = require("redis");
const app = express();

app.use(express.json());

// Redis istemcisi oluştur
const redisClient = createClient({
  url: "redis://db:6379"
});

redisClient.connect().catch(console.error);

// GET /notes → notları oku
app.get("/notes", async (req, res) => {
  const notes = await redisClient.lRange("notes", 0, -1);
  res.json(notes.map((note, index) => ({ id: index + 1, content: note })));
});

// POST /notes → not ekle
app.post("/notes", async (req, res) => {
  const { content } = req.body;
  await redisClient.rPush("notes", content);
  res.json({ message: "Not eklendi!", content });
});

app.listen(3000, () => {
  console.log("Sunucu çalışıyor: http://localhost:3000");
});
