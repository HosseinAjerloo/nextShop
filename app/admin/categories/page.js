'use client';
import {useEffect, useState} from "react";
import Loading from "@/app/components/Loading";
import {toPersian} from "@/lib/helpers";
import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import ErrorAlert from "@/app/components/ErrorAlert";

const page = () => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState([])
    useEffect(() => {

        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/categories')
                if (!response.ok)
                    setError('اوه خطای ناشناس رخ داد');
                const data = await response.json();
                setData(data.categories);
            } catch (error) {
                throw new Error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCategories();
    }, [])

    const destroyRecord = async (id) => {
        const request = await fetch(`/api/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const response = await request.json();
        if (!request.ok) {
            const changeErrorToArray = Object.entries(response);
            console.log(changeErrorToArray)
            changeErrorToArray.forEach(([key, message]) => {
                setErrors(error => {
                    return [
                        ...error,
                        {
                            key,
                            message
                        }
                    ]
                })
            })
        } else {
            const filterItem = data.filter(item => {
                return item._id !== id
            })
            setData(filterItem)
        }

    }
    return (<>
        <ErrorAlert errors={errors}/>

        <div className='p-6 bg-primary-bg text-text-color'>
            <h1 className='font-4xl'>بخش دسته بندی ها</h1>
            <p>در این بخش میتوانید موارد مربوط دسته بند هارا مدیریت کنید</p>
        </div>

        <section className='container mx-auto px-6'>
            <Link href='/admin/categories/create'>
                <div
                    className='mt-2 mb-1 px-4 py-1.5 rounded-lg bg-green-700 text-text-color inline-flex items-center justify-center'>
                    <IoMdAdd className='text-bold'/>
                    <span className='flex items-center justify-center'>اضافه کردن</span>
                </div>
            </Link>
            <section className='overflow-x-auto mt-5'>
                {
                    isLoading ? <Loading/> :
                        <table className='table-auto  w-full '>
                            <thead>
                            <tr className='bg-gray-200 rounded-lg'>
                                <th className='text-center py-1.5'>شناسه</th>
                                <th className='text-center py-1.5'>نام</th>
                                <th className='text-center py-1.5'>وضعیت</th>
                                <th className='text-center py-1.5'>وضعیت</th>
                                <th className='w-[20%]  text-center py-1.5'>عملیات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr key={item._id} className='text-center border-b border-b-gray-300'>
                                        <td className='py-3'>{index + 1}</td>
                                        <td className='py-3'>{item.name}</td>
                                        <td className='py-3'>{item.status ? 'فعال' : 'غیر فعال'}</td>
                                        <td className='py-3'>{toPersian(item.createdAt)}</td>
                                        <td className='py-3'>
                                            <div className='flex items-center space-x-2 justify-center'>
                                                <Link href={`/admin/categories/edit/${item._id}`}
                                                   className='px-4 py-1.5 rounded-lg bg-green-700 text-text-color text-sm'>ویرایش</Link>
                                                <button onClick={() => destroyRecord(item._id)}
                                                        className='px-4 py-1.5 rounded-lg bg-rose-700 text-text-color text-sm '>حذف
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            </tbody>
                        </table>
                }

            </section>
        </section>
    </>)
}
export default page;