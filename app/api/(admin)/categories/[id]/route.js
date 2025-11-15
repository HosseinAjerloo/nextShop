import {NextResponse} from "next/server";
import connectionDB from "@/lib/connectionDB";
import Category from "@/models/Category";
import {RequestValidation} from "@/lib/Validation/RequestValidation";

export const GET = async (request, {params}) => {
    try {
        await connectionDB();
        const {id} = await params;
        const category = await Category.findById({'_id': id})
        if (Object.keys(category).length > 0)
            return NextResponse.json({category}, {status: 200})
        else
            return NextResponse.json({
                error: {
                    message: "دسته بندی مورد نظر شما یافت نشد"
                }
            }, {status: 500})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
export const DELETE = async (request, {params}) => {

    try {
        const {id} = await params
        await connectionDB();
        const category = await Category.deleteOne({'_id': id})
        if (Object.keys(category).length > 0)
            return NextResponse.json({meesage: 'success'}, {status: 200})
        else
            return NextResponse.json({
                error: {
                    message: 'پاک کردن رکورد با شکست مواجه شد لطفا مجددا تلاش فرمایید'
                }
            }, {status: 500})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}
export const PUT = async (request, {params}) => {
    try {
        const {id} = await params;
        const data = await request.json();
        RequestValidation.attributes = {
            name: 'required',
            status: 'in:true,false|required'
        };
        RequestValidation.values = data;
        if (RequestValidation.validation())
            return NextResponse.json({error: RequestValidation.messageError}, {status: 500})


        await connectionDB();
        const category = await Category.findOneAndUpdate({'_id': id}, data, {
            new: true
        })
        if (Object.keys(category).length > 0)
            return NextResponse.json({category}, {status: 200})
        else
            return NextResponse.json({
                error: {
                    message: "دسته بندی مورد نظر شمابروز رسانی نشد"
                }
            }, {status: 500})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}