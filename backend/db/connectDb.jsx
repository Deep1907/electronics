const mongoose = require("mongoose")

const connectDb = () =>{
    mongoose.connect("mongodb://deepakkguptaa343_db_user:Ka7aSH4Tgw9nqGuo@ac-n3oizyq-shard-00-00.a40hf7j.mongodb.net:27017,ac-n3oizyq-shard-00-01.a40hf7j.mongodb.net:27017,ac-n3oizyq-shard-00-02.a40hf7j.mongodb.net:27017/electronic?ssl=true&replicaSet=atlas-mq316r-shard-0&authSource=admin&appName=Cluster0")

    console.log("Database Connected")
}

module.exports = connectDb;