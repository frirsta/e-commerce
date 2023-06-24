import cors from 'cors';
import express from 'express';

const app = express()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3000, () => console.log('API running on 3000'))



app.get("/", (req, res) => {
    res.send('MY app works!')
});
