import express , {Request, Response, NextFunction} from 'express';

const app = express();

app.use(express.json());

// app.get('/', (req:Request, res:Response) => {
//      // return res.send("first ejs app");
//      // res.json({
//      //      success: true,
//      //      name:"Vaibhav",
//      // })
//      res.redirect("http://example.gom")
//});

//chain requests 
// app.route('/api/shipments')
//      .get((req: Request, res: Response) => {
//           return res.send("GET all the books");
//      })
//      .post((req: Request, res: Response) => {
//           return res.send("CREATE new book");
//      })
//      .put((req: Request, res: Response) => {
//           return res.send("UPDATE the book");
//      })
//      .delete((req: Request, res: Response) => {
//           return res.send("DELETE the book");
//      })
//      .all((req: Request, res: Response) => {
//           return res.send("you made a WRONG request");
//      })

// app.post('/api/data', (req:Request, res:Response) => {
//      console.log(req.body);
//      return res.sendStatus(200);
// })

// app.all('/api/all', (req:Request, res:Response) => {
//      return res.sendStatus(200)
// })

// app.get('/health', (req, res)=> res.sendStatus(200))
// app.get('/ab*cd', (req, res) => res.send('/ab*cd'))
// app.get('/abc/', (req, res) => res.send('/abc')) //regular expression

// app.get('/api/books/:bookId', (req:Request, res:Response) => {
//      console.log(req.params);
//      return res.send(req.params.bookId);
// })

// app.get('/api/books/:bookId/:authorId', (req:Request, res:Response) => {  //multiple id
//      console.log(req.params);               
//      return res.send(req.params);
// })

// by making separate functions

// function idHandler(req:Request, res:Response){
//      console.log(req.params)             
//      return res.send(req.params)
// }

// app.get('/api/serial/:serilId/:episodeId', idHandler)

// by making built-in "NextFunction" method

// function getCoinHandler(req:Request, res:Response, next:NextFunction) {
//      console.log(req.params);

//      return res.send(req.params);
// }

// app.get('/api/:cryptoId/:tokenId/:capId', getCoinHandler)

// two functions

const middleware = ({name}:{name:string}) => 

(req: Request, res: Response, next: NextFunction)=>{
     res.locals.name = name;
     next();
}

app.use(middleware({name:"ts - ignore removed"}));

app.get('/api/books/:bookId/:authorId', (req: Request<{ bookId: string }, { authorId: string }, { name: string }, {}>, res: Response, next: NextFunction) => {
     
     console.log(res.locals.name);
     res.send(res.locals.name)
});

async function throwError() {
      throw new Error("what a error man")
}

// always wrap errors in try catch
app.get('/error', async (req, res) => {
     try {
          await throwError();
          res.sendStatus(200);
     } catch (error) {
          res.status(400).send("some bad error");
     }
})

app.listen(3000, () => {
     console.log("server running at port 3000");
})