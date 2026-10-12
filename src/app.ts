import express from "express"
import collageRouter from "./apps/collage/index.js"
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.end("Hello, Wrold!")
})

app.use('/api/v1/collage', collageRouter)


export default app
