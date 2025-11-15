'use client'
import {useForm} from "react-hook-form";
import {MdOutlineDriveFileRenameOutline} from "react-icons/md";
import {CgUnavailable} from "react-icons/cg";
import {useCallback, useEffect, useState} from "react";
import ErrorAlert from "@/app/components/ErrorAlert";
import {useRouter} from "next/navigation";

const page = () => {
    const route=useRouter();
    const {register, watch, reset, setValue, getValues, formState: {errors}, handleSubmit} = useForm()
    const [error,setError]=useState([]);
    useEffect(()=>{
        dispatchFunc();
    },[errors])
    const formClick=useCallback(()=>{
        dispatchFunc()
    },[errors])

    const dispatchFunc=()=>{
        const allError=Object.entries(errors);
        if (Array.isArray(allError) && allError.length>0)
        {
            allError.map(([key,...object])=>{
                setError(error=>{
                    return [...error,{
                        key,
                        message:object[0].message
                    }]
                })
            })
        }
    }

    const submitHandel = async (data) => {
            const request=await fetch('/api/categories/',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(data)
            })
        let response= await request.json();

        if (!request.ok)
        {
             response.error.map(responseError=>{
                     setError(error=>[...error,responseError])
                })
        }else {
            route.push('/admin/categories')
        }

    }
    return (<>
         <ErrorAlert errors={error}/>
        <div className='p-6 bg-primary-bg text-text-color'>
            <h1 className='font-4xl'>بخش دسته بندی ها</h1>
            <p>در این بخش میتوانید موارد جدیدی به دسته بندی اضافه کنید</p>
        </div>
        <section className='container mx-auto px-6 mt-2'>
            <form className='p-4 flex items-center flex-wrap space-x-2' onSubmit={handleSubmit(submitHandel)}>
                <div className='w-[49%] flex items-center space-x-2'>
                    <MdOutlineDriveFileRenameOutline className='text-[25px]'/>
                    <input name='name' {...register('name',{
                        required:'وارد کردن فیلد نام اجباری میباشد'
                    })}  className='w-full outline-none border-b-2 border-b-gray-200 px-4 py-1.5 ' type="text" placeholder='name'/>
                </div>
                <div className='w-[49%] flex items-center space-x-2'>
                    <CgUnavailable className='text-[25px]'/>
                        <select name='status'  {...register('status',{
                            required:'وارد کردن فیلد وضعیت اجباری میباشد',
                            validate:(value)=>{
                                if ( !['true','false'].includes(value))
                                {
                                    return 'مقدار فیلد وضعیت باید فعال یا غیر فعال باشد'
                                }
                                return true;
                            }
                        })} className='w-full outline-none border-b-2 border-b-gray-200 px-4 py-1.5'>
                                <option value='true'>فعال</option>
                                <option value='false'>غیرفعال</option>
                        </select>
                </div>
                <button onClick={dispatchFunc} type='submit' className='bg-green-700 rounded-lg text-text-color mt-4 cursor-pointer px-6 py-1.5'>ذخیره</button>
            </form>
        </section>

    </>)
}
export default page;