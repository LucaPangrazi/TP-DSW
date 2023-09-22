import express from 'express'
// import { userRouter } from './routes/user.routes.ts'

const app = express()
app.use(express.json())

// app.use('/api/users', userRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})