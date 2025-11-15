import {Product} from "@/models/Product";
import {NextResponse} from "next/server";
import connectionDB from "@/lib/connectionDB";

export const GET = async () => {

    try {
        await  connectionDB();
        const products=await Product.find({}).populate('category')
        return  NextResponse.json({products},{status:200})
    } catch (error) {
        return  NextResponse.json({error:{
            message:error.message
            }},{status:500})


    }
}