import mongoose from "mongoose";

const {Schema} = mongoose;
const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        description: 'name is required'
    },
        description: {
        type: String,
        trim: true,
        required: true,
        description: 'name is required'
    },
    status: {
        type: Boolean,
        required: true,
        description: 'status is required'
    },
    stock: {
        required: true,
        type: Number,
        description: 'stock is product'
    },
    price: {
        required: true,
        type: Number,
        description: 'price is required'
    },
    category: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        description: 'required is Category'
    },
    image: {
        path: {
            type: String,
            required: true,
            description: 'path name is required'
        },
        name: {
            type: String,
            required: true,
            description: 'image name is required'
        }

    }
},{
    timestamps:true
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export {Product}