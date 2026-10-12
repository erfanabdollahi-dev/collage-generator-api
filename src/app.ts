import express from "express"

const app = express()

app.get("/", (req, res) => {
  res.end("Hello, Wrold!")
})


export default app
