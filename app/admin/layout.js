import Sidebar from "@/app/components/Sidebar";
import Main from "@/app/components/Mina";
import {Suspense} from 'react'
import Loading from "@/app/components/Loading";

const layout = ({children}) => {
    return (<>
    <section className='flex'>
        <Suspense fallback={<Loading/>}>
        <Sidebar/>
    </Suspense>
    <Suspense fallback={<Loading/>}>
        <Main>
            {children}
        </Main>
    </Suspense>

    </section>
</>)
}
export default layout;