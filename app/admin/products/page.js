'use client'
import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import Loading from "@/app/components/Loading";
import {toPersian} from "@/lib/helpers";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import ErrorAlert from "@/app/components/ErrorAlert";

const page = () => {
    const [error, setError] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/products', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            if (!response.ok)
            {
                setError(error=>{
                    return [...error,{key:'responseData',message:'در دریافت اطلاعات خطا پیش آمدر '}]
                })
            }
            const responseData = await response.json();
            const {products}=responseData;

            setData(products)

        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (<>
        <div className='p-6 bg-primary-bg text-text-color'>
            <h1 className='font-4xl'>بخش محصولات</h1>
            <p>در این بخش میتوانید موارد مربوط محصولات را مدیریت کنید</p>
        </div>

        <section className='container mx-auto px-6'>
            <Link href='/admin/products/create'>
                <div
                    className='mt-2 mb-1 px-4 py-1.5 rounded-lg bg-green-700 text-text-color inline-flex items-center justify-center'>
                    <IoMdAdd className='text-bold'/>
                    <span className='flex items-center justify-center'>اضافه کردن</span>
                </div>
            </Link>
            {isLoading ? <Loading/> :

                <section className='overflow-x-auto mt-5'>
                    {error? <ErrorAlert errors={error}/>:'' }

                        <table className='table-auto  w-full '>
                            <thead>
                            <tr className='bg-gray-200 rounded-lg'>
                                <th className='text-center py-1.5'>شناسه</th>
                                <th className='text-center py-1.5'>نام</th>
                                <th className='text-center py-1.5'>توضیحات</th>
                                <th className='text-center py-1.5'>وضعیت</th>
                                <th className='text-center py-1.5'>موجودی انبار</th>
                                <th className='text-center py-1.5'>قیمت</th>
                                <th className='text-center py-1.5'>نام دسته بندی</th>
                                <th className='text-center py-1.5'>عکس محصول</th>
                                <th className='text-center py-1.5'>تاریخ</th>
                                <th className='text-center py-1.5'>عملیات</th>
                            </tr>
                            </thead>
                            <tbody>

                            {data && data.map((product,index)=>{

                                return (
                                    <tr key={product._id} className='text-center border-b border-b-gray-300'>
                                        <td className='py-3'>{index+1}</td>
                                        <td className='py-3'>{product.name}</td>
                                        <td className='py-3'>{product.description}</td>
                                        <td className='py-3'>{product.status?'فعال':'غیرفعال'}</td>
                                        <td className='py-3'>{product.stock}</td>
                                        <td className='py-3'>{product.price}</td>
                                        <td className='py-3'>{product.category?.name}</td>
                                        <td className='py-3'>image.name</td>
                                        <td className='py-3'>{product.createdAt}</td>
                                        <td className='py-3'>
                                            <div className='flex items-center space-x-2 justify-center'>
                                                <Link href={`/admin/categories/edit/`}
                                                      className='px-4 py-1.5 rounded-lg bg-green-700 text-text-color text-sm'>ویرایش</Link>
                                                <button
                                                    className='px-4 py-1.5 rounded-lg bg-rose-700 text-text-color text-sm '>حذف
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>


                </section>
            }
        </section>
    </>)
}
export default page