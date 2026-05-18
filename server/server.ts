import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";

const app = express();

const trustedOrigins = (process.env.TRUSTED_ORIGINS ?? '').split(',').filter(Boolean);
const corsOptions = {
    origin: trustedOrigins,
    credentials: true,
}

// Middleware 
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }));
app.all('/api/auth/{*any}', toNodeHandler(auth));

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});