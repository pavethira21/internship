const express = require('express')
const {MongoClient} = require('mongodb');
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs')

app.use(cors())
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

const uri="mongodb://localhost:27017"
const client = new MongoClient(uri)

async function insertRecords(re){
    const result = await client.db("movieReview").collection("users").insertOne(re)
    return result
  }

async function main(){
    try{
        await client.connect();
        console.log("connected to mongodb")   
    }catch(e){console.error(e)}}  


app.post("/addCollections",async(req,res)=>{
    main()

    const {collectionName,filePath} = req.body
   
    console.log(typeof filePath)
    // const collectionName = "users"
    // const filePath ="users.json"
    
    try{
        
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        console.log(data)
        const del = await client.db("movieReview").collection(collectionName).drop()
        if(del){
            const result = await client.db("movieReview").collection(collectionName).insertMany(data)
            client.close()
            res.send("inserted")
            console.log(`Inserted ${result.insertedCount} documents`);
        }else{
            console.log("not inserted")
            console.log("not deleted")
        }
        
        
    }catch(e){
        console.log(e)
    }
    finally{
        client.close()
    }
})
app.get("/fetchMovies",async (req,res)=>{
    const {genre,page} =req.query
    const limit = 20;
    const skip = (page - 1) * limit;
    console.log(genre)
    main()
    try{
        if(genre){
            
            const details = await client.db("movieReview").collection("movies").find({genres:{"$in":[`${genre}`]}}).limit(limit).toArray()
            
            console.log("hit")
            const totalReviews = await client.db("movieReview").collection("movies").countDocuments({});
            client.close(); 
            console.log("not hit")
            return res.status(200).json({
            details,
            currentPage: page,
            totalPages: Math.ceil(totalReviews / limit),
            totalReviews,
        });
            
        }
        else{
            const details = await client.db("movieReview").collection("movies").find({}).skip(skip).limit(20).toArray();
            console.log("hit")
            const totalReviews = await client.db("movieReview").collection("movies").countDocuments({});
            client.close(); 
            console.log("not hit")
            return res.status(200).json({
            details,
            currentPage: page,
            totalPages: Math.ceil(totalReviews / limit),
            totalReviews,
        });
            
        }
          
    }catch(e){
        res.send(e)
    }
    finally{
        client.close()
    }

})

app.get("/fetchSeries",async (req,res)=>{
    const {genre} =req.query
    main()
    try{
        if(genre && genre !=' '){
            const details = await client.db("movieReview").collection("series").find({genres:{"$in":[`${genre}`]}}).limit(20).toArray()
            console.log(details)
            res.send(details)
            client.close(); 
        }
        else{
            const details = await client.db("movieReview").collection("series").find({}).limit(20).toArray();
            console.log(details)
            res.send(details)
            client.close(); 
        }
        
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
        const allUsers = await client.db("movieReview").collection("users").find({}).toArray( 
        );
        console.log(allUsers)
        res.send(allUsers)
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
    const {userName,password,email,genre,status} =req.body
    const record = {userName:userName,password:password,email:email,genre:genre,status:status}
    const users = await client.db("movieReview").collection("users").findOne({email:email})
    
    console.log(users)
    //console.log(checkExist);
    
    if(users){
        client.close()
        return res.status(401).json({message:"User already exist"})
        
    }else{
               const status= insertRecords(record)
               //console.log((await status).acknowledged)
               if((await status).acknowledged){
                client.close()
                console.log("db Closed");
                
                return res.status(200).json({message:"Updated"})
               }else{
                client.close()
                return res.status(401).json({message:"Not Updated"})
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
        const newEntry = {title:title,review:[{userName:userName,comment:comment}]  } 
       
            let exist = await client.db("movieReview").collection("reviews").findOne({ title:title })
            if(exist){
                let status = await client.db("movieReview").collection("reviews").updateOne({title:title},{$push:{review:{userName:userName,comment:comment}}})
                if(status.modifiedCount>0){
                    return res.status(200).json({message:"Added successfully"})
                }else{return res.status(500).json({error:"failed to Add"})}
            }else{
                let status = await client.db("movieReview").collection("reviews").insertOne(newEntry)
                if(status.acknowledged){
                    return res.status(201).json({message:"Added successfully"})
                }else{return res.status(500).json({error:"failed to Add"})}
            }
            
    }catch(e){
        console.log(e)
        return res.status(500).json({error:"Server error"})
    }finally{
        await client.close();
    }
})



app.delete("/DeactuvateUser",async(req,res)=>{
    const {uName} = req.query
    main()
    try{
        const result = await client.db("movieReview").collection("users").deleteOne({userName:uName})
        console.log(result)
        
        if((result).acknowledged){
            client.close()
            console.log("db Closed");
            
            return res.send("Records Deleted Succefully")
           }else{
            client.close()
            return res.send("Records cannot be Deleted")}

    }catch(e){
        console.log(e)
    }
})



app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });