import dotenv from "dotenv"
import express from "express"
import { fileURLToPath } from "node:url"

dotenv.config({
    path: fileURLToPath(new URL("../../../packages/db/.env", import.meta.url)),
})

const { prisma } = await import("@repo/db")

const app = express()
app.use(express.json())

app.get("/user", (req, res) => {
    prisma.user.findMany()
    .then(users => res.json(users))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(500).json({error: {msg: "username and password are required!"}})
        return;
    }

    prisma.user.create({
        data: { username, password }
    })
    .then(user => res.json(user))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err.message });
    });
})

app.listen(4000, () => {
    console.log("backend running on port 3000")
})
