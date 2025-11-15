import mongoose from "mongoose";

const connectionUri = process.env.DBCONNECTION;
if (!connectionUri)
    throw new Error('con`t read connectionUri');

let connection = global.mongoose;

if (!connection)
    connection=global.mongoose = {connect: null, promise: null};

const dbConnect = async () => {
    try {
        if (connection.connect)
            return connection.connect

        connection.promise =  mongoose.connect(connectionUri).then(result=>{
            return result
        });
        connection.connect = await connection.promise;
        return connection.connect
    } catch (error) {
        console.log('con`t connection to db');
    }
}
export default dbConnect;