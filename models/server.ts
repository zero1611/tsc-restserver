    import  express, {Application}  from 'express';
    import userRoutes from "../routes/users";
    import cors from 'cors'
    import db from "../db/connection";

     class Server{
        private  app: Application;
        private port: string;
        private apiPaths = {
            users: '/api/users'
        }

        constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
        }
        async dbConnection(){
            try {
                await db.authenticate();
                console.log('Data Base Online')
            }catch (e) {
                throw new Error(e);
            }
        }

         middlewares(){
             //cors
             this.app.use(cors() )
             //lectura del body
             this.app.use(express.json())
             // carpeta publica
             this.app.use(express.static( 'public'));
         }
        routes(){
            this.app.use(this.apiPaths.users, userRoutes)
        }



        listen(){
            this.app.listen(this.port, ()=>{
                console.log('Servidor corriendo en puerto ' + this.port);
            })
        }
     }
     export default Server;