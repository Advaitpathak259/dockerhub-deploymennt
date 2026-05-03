import express from "express";
import { prisma } from "@repo/db";
import "dotenv/config";

const app = express();
app.use(express.json());


// Create user
app.post("/users", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.create({
    data: { username, password },
  });

  res.json(user);
});

// Get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

/* ================= TODO ============ */

// Create todo
app.post("/todos", async (req, res) => {
  const { task, userId } = req.body;

  const todo = await prisma.todo.create({
    data: { task, userId },
  });

  res.json(todo);
});

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

// Get todos of a user
app.get("/users/:userId/todos", async (req, res) => {
  const { userId } = req.params;

  const todos = await prisma.todo.findMany({
    where: { userId },
  });

  res.json(todos);
});

// Mark todo as done
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const todo = await prisma.todo.update({
    where: { id },
    data: { done: true },
  });

  res.json(todo);
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.todo.delete({
    where: { id },
  });

  res.json({ message: "Deleted" });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});