'use client'
import {useEffect, useRef, useState} from "react";

import {MdOutlineDriveFileRenameOutline} from "react-icons/md";
import {CgUnavailable} from "react-icons/cg";
import {BiCategory} from "react-icons/bi";
import {FaSackDollar} from "react-icons/fa6";
import {MdWarehouse} from "react-icons/md";
import {FaFileImage} from "react-icons/fa";
import {AiFillFileText} from "react-icons/ai";

const page = () => {
    const [CKEditor, setCKEditor] = useState(null)
    const [ClassicEditorBuild, setClassicEditorBuild] = useState(null)
    const [EditorWatchdog, setEditorWatchdog] = useState(null)
    const editorRef = useRef(null);


    useEffect(() => {
        const load = async () => {
            const cke = (await import('@ckeditor/ckeditor5-react')).CKEditor;
            const classicEditor = (await import('@ckeditor/ckeditor5-build-classic')).default;
            const watchDog = (await import('@ckeditor/ckeditor5-watchdog')).EditorWatchdog;

            setCKEditor(() => cke)
            setClassicEditorBuild(() => classicEditor)
            setEditorWatchdog(() => watchDog)
            
        }
        load();
    }, [])

    useEffect(() => {
        if (!CKEditor || !ClassicEditorBuild || !EditorWatchdog)
            return

        const watching = new EditorWatchdog(ClassicEditorBuild)
        watching.setCreator((element, config) => {

            element.parentElement.style.width='100%';
            const customConfig={
                ...config,
                language:'fa'
            }
            return ClassicEditorBuild.create(element, customConfig)
        })
        watching.setDestructor(editor => editor.destroy())
        watching
            .create(editorRef.current)
            .catch(error => console.error("CKEditor failed to initialize:", error));

        return () => {
            watching.destroy().catch(() => {
            });
        };
    }, [CKEditor, ClassicEditorBuild, EditorWatchdog])

    const editorConfiguration = {
        toolbar: ['bold', 'italic']
    };
    if (!CKEditor) return <p>Loading editor...</p>;

    return (<>
        <div className='p-6 bg-primary-bg text-text-color'>
            <h1 className='font-4xl'>بخش محصولات ها</h1>
            <p>در این بخش میتوانید موارد جدیدی به محصولات خود اضافه کنید</p>
        </div>
        <section className='container mx-auto px-6 mt-2'>
            <form className='p-4 flex items-center flex-wrap space-x-2 space-y-4 '>
                <div className='w-[49%] flex items-center space-x-2'>
                    <MdOutlineDriveFileRenameOutline className='text-[25px]'/>
                    <input name='name' className='w-full outline-none border-b-2 border-b-gray-200 px-4 py-1.5 '
                           type="text" placeholder='name'/>
                </div>
                <div className='w-[49%] flex items-center space-x-2'>
                    <BiCategory className='text-[25px]'/>
                    <select name='status' className='w-full outline-none border-b-2 border-b-gray-200 px-4 py-1.5'>
                        <option value='true'>گوشی</option>
                        <option value='false'>لپ تاپ</option>
                    </select>
                </div>
                <div className='w-[49%] flex items-center space-x-2'>
                    <FaSackDollar className='text-[25px]'/>
                    <input name='name' className='w-full outline-none border-b-2 border-b-gray-200 px-4 py-1.5 '
                           type="text" placeholder='price'/>
                </div>
                <div className='w-[49%] flex items-center space-x-2'>
                    <MdWarehouse className='text-[25px]'/>
                    <input name='name' className='w-full outline-none border-b-2 border-b-gray-200 px-4 py-1.5 '
                           type="text" placeholder='stock'/>
                </div>
                <div className='w-[49%] flex items-center space-x-2'>
                    <CgUnavailable className='text-[25px]'/>
                    <select name='status' className='w-full outline-none border-b-2 border-b-gray-200 px-4 py-1.5'>
                        <option value='true'>فعال</option>
                        <option value='false'>غیرفعال</option>
                    </select>
                </div>
                <div className='w-[49%] flex items-center space-x-2'>
                    <FaFileImage className='text-[25px]'/>
                    <input type='file' name='imae'/>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <AiFillFileText className='text-[25px]'/>
                    <div ref={editorRef}>
                    </div>
                </div>
                <button type='submit'
                        className='bg-green-700 rounded-lg text-text-color mt-4 cursor-pointer px-6 py-1.5'>ذخیره
                </button>
            </form>
        </section>
    </>);
}
export default page;