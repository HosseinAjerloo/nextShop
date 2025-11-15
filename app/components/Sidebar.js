import { RiProductHuntFill } from "react-icons/ri";

import Link from "next/link";
import {MdHome} from "react-icons/md";
import {FaTags} from "react-icons/fa";

const Sidebar=()=>{
    return (<>
        <aside className='w-[15%]  h-screen bg-sidebar-bg'>
            <ul >
                <li className=' w-full text-text-color transition-colors duration-[.75s] cursor-pointer hover:bg-hover-bg p-3'>
                    <Link href='/admin' className='flex items-center transition-colors duration-[.5s] hover:text-highlight-color text-lg '>
                        <MdHome/>
                        <span className='mr-2'>داشبورد</span>
                    </Link>
                </li>
                <li className=' w-full text-text-color transition-colors duration-[.75s] cursor-pointer hover:bg-hover-bg p-3'>
                    <Link href='/admin/categories' className='flex items-center transition-colors duration-[.5s] hover:text-highlight-color text-lg '>
                        <FaTags/>
                        <span className='mr-2'>دسته بندی ها</span>
                    </Link>
                </li>
                <li className=' w-full text-text-color transition-colors duration-[.75s] cursor-pointer hover:bg-hover-bg p-3'>
                    <Link href='/admin/products' className='flex items-center transition-colors duration-[.5s] hover:text-highlight-color text-lg '>
                        <RiProductHuntFill />
                        <span className='mr-2'>محصولات</span>
                    </Link>
                </li>
            </ul>
        </aside>
    </>)
}
export default Sidebar;