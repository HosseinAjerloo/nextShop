import {NextResponse} from "next/server";
import dbConnect from "@/lib/connectionDB";
import CategoryModel from "@/models/Category";
import {RequestValidation} from "@/lib/Validation/RequestValidation";
import connectionDB from "@/lib/connectionDB";
import Category from "@/models/Category";

export const GET = async () => {

    try {
        await dbConnect();
        const categories = await CategoryModel.find({});
        return NextResponse.json({categories}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}
export const POST = async (request) => {
    const validationErrors = [];
    try {
        const data = await request.json();

        RequestValidation.attributes = {
            name: 'required',
            status: 'in:true,false|required'
        };
        RequestValidation.values = data;
        if (RequestValidation.validation())
            return NextResponse.json({error: RequestValidation.messageError}, {status: 500})

        await connectionDB();
        const category = await Category.create(data)
        if (Object.keys(category).length > 0)
            return NextResponse.json({message: 'success'}, {status: 200});
        else
            return NextResponse.json({
                error: {
                    message: 'در ساخت دسته بندی خطایی رخ داد'
                }
            }, {status: 500})

    } catch (error) {
        return NextResponse.json({error: {
            message: error.message
            }}, {status: 500});
    }
}
