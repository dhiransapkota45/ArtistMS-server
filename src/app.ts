import http from 'http';
import express, { Request, Response, Application, NextFunction } from 'express';
import cors from 'cors';

import env from './config/env';
import { UserRoute } from './routes/userRoute';
import { ApiError } from './utils/ApiError';
import { AuthRoute } from './routes/authRoutes';
import { MusicRoute } from './routes/musicRoutes';

 export class App {
  private app: Application = express();
  private port: number = env.PORT;
  private server: http.Server | undefined;

  private userRoute = new UserRoute();
  private authRoute = new AuthRoute();
  private musicRoute = new MusicRoute()
  constructor(){
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupExceptionHandler();
  }

  setupMiddlewares(){
    this.app.use(express.json());
    this.app.use(cors({origin: '*'}));
    this.app.use(express.urlencoded({extended: true}));
  }

  setupExceptionHandler(){
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      const error = new ApiError(500, err.message, [])
      console.log(error)
      return res.status(error.status).json(error);
    });
  }

  setupRoutes(){
    this.app.use('/', this.userRoute.router);
    this.app.use('/', this.authRoute.router);
    this.app.use('/', this.musicRoute.router)
    //test route
    this.app.get('/', (req, res) => {
      return res.send('Hello World');
    });
  }

  listen(){
    this.server = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  close(){
    this.server?.close(()=>{
      console.log('Server closed');
      process.exit(0);
    });
  }
}