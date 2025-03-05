const express = require('express')
const {MongoClient} = require('mongodb');
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

const uri="mongodb://localhost:27017"
const client = new MongoClient(uri)

async function insertRecords(re){
    const result = await client.db("movieReview").collection("users").insertOne(re)
    return result
  }
async function getUsers(){
    const details = await client.db("movieReview").collection("users").find({}).toArray( 
    );
    return details
}


async function main(){
    try{
        await client.connect();
        console.log("connected to mongodb")   
    }catch(e){console.error(e)}}  
app.get("/fetchMovies",async (req,res)=>{
    main()
    try{
        const details = await client.db("movieReview").collection("movies").find({}).limit(20).toArray();
        console.log(details)
        res.send(details)
        client.close();   
    }catch(e){
        res.send(e)
    }
    finally{
        client.close()
    }

})

app.get("/fetchSeries",async (req,res)=>{
    main()
    try{
        const details = await client.db("movieReview").collection("series").find({}).toArray( 
        );
        console.log(details)
        res.send(details)
        client.close();
        
    }catch(e){
        res.send(e)
    }
    finally{
        client.close()
    }

})

app.get("/fetchUsers",async (req,res)=>{
    main()
    try{
        const details = getUsers()
        console.log(details)
        res.send(details)
        client.close();
        
    }catch(e){
        res.send(e)
    }
    finally{
        client.close()
    }


});

app.get("/fetchLatest",async (req,res)=>{
    main()
    try{
        const details = await client.db("movieReview").collection("latest").find({}).toArray( 
        );
        console.log(details)
        res.send(details)
        client.close();
        
    }catch(e){
        res.send(e)
    }
    finally{
        client.close()
    }

});

app.post('/Adduser',async(req,res)=>{
    main()
    try{
    const {userName,password,email} =req.body
    const record = {userName:userName,password:password,email:email}
    const users = getUsers();

    const checkExist = (await users).find((item,i)=>{
        if (item.email == email){
            let data = item 
            return data
          }
    })
    console.log(checkExist);
    
    if(checkExist){
        return res.json({message:"User already exist"})
    }else{
        const status= insertRecords(record)
               console.log((await status).acknowledged)
               if((await status).acknowledged){
                client.close()
                console.log("db Closed");
                
                return res.send("Records Inserted Succefully")
               }else{
                client.close()
                return res.send("Records cannot be inserted")
               }
    }

    
    
    
            }catch(e){
                console.log(e)
            }
            finally{
                client.close()
            }
})

app.get("/fetchReviews",async (req,res)=>{
    const {title} = req.query
    main()
    try{
        const rev = await client.db("movieReview").collection("reviews").findOne({title:title});
        console.log(rev)
        res.send(rev)
        client.close();
        
    }catch(e){
        res.send(e)
    } 
    finally{
        client.close()
    }

});

app.post("/AddReview",async(req,res)=>{
    main()
    try{
        const{title,review}=req.body
        const{userName,comment} = review
        //const comment ={title:title,review:review}
        
            let status = await client.db("movieReview").collection("reviews").updateOne({title:title},{$push:{review:{userName:userName,comment:comment}}})
            
            if((status).acknowledged){
                client.close()
                console.log("db Closed");
                
                return res.send("Records Inserted Succefully")
               }else{
                client.close()
                return res.send("Records cannot be inserted")
               
        }
        
        
        console.log(comment)


    }catch(e){
        console.log(e)
    }
})



app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });