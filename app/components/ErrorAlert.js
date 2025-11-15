'use client'
import {useCallback, useEffect, useMemo, useState} from "react";

const ErrorAlert=({errors=[]})=>{
    const [allErrors,setAllErrors]=useState([]);
    useEffect(()=>{
                setAllErrors(errors);

    },[errors])

    useEffect(()=>{
        const allElementError=document.querySelectorAll('.error-alert')
        const mouseEvent=new MouseEvent('click',{bubbles:true})
        allElementError.forEach((alertErrorItem)=>{
            alertErrorItem.addEventListener(mouseEvent,()=>{
                removeAlertElement(alertErrorItem)
            });
            setTimeout(()=>{
                alertErrorItem.dispatchEvent(mouseEvent)
            },2000)
        })

    },[allErrors])


    const  removeAlert=useCallback((e)=>{
        const element=e.currentTarget;
        element.style.opacity=0;
        removeAlertElement(element)
    },[errors])

    const removeAlertElement = (elem) => {
        elem.addEventListener('transitionend',function (){
            elem.remove();
        })
    }


    return (<>


        <div className=' fixed  w-1/2 top-[10px] right-[15px]'>
            {allErrors.map((error,index)=>{
                return (
                    <div onClick={removeAlert} key={index} className='opacity-100 duration-500 transition-all  p-2 w-1/2 flex error-alert  '>
                        <div id="alert-2"
                             className="flex flex-col  justify-center   text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                             role="alert">
                            <div className='flex  items-center p-2 mb-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 '>
                                <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <div className="ms-3 text-sm font-medium flex items-center">
                                    <span className='inline-block'>{error.message}</span>

                                </div>
                                <button type="button"
                                        className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                                        data-dismiss-target="#alert-2" aria-label="Close">
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinecap="round" strokeWidth="2"
                                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                </button>
                            </div>
                            <div className='w-[0px] h-[3px] bg-rose-700 rounded-lg process-error '></div>
                        </div>
                    </div>
                )
            })}
        </div>


    </>)
}
export default ErrorAlert;