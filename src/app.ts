import express from 'express'
import trabalhoRoutes from './Routes/tarefaRoutes'

const app = express();
const port = 3000;

app.use(express.json())
app.use("/trabalhos", trabalhoRoutes)

app.listen(port, () => {
    console.log(`Server Aberto ${port}`);
    
})