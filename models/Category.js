import mongoose from "mongoose";

export const  CategorySchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        description:'name is required'
    },
    status:{
        type:Boolean,
        required:true,
        description:'status is required'
    }
},{
    timestamps:true,
});
const CategoryModel=mongoose.models.Category || mongoose.model('Category',CategorySchema);
export default CategoryModel;