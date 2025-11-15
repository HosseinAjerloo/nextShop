import Sidebar from "@/app/components/Sidebar";
import Main from "@/app/components/Mina";

const layout = ({children}) => {
    return (<>
        <section className='flex'>
            <Sidebar/>
           <Main>
               {children}
           </Main>
        </section>
    </>)
}
export default layout;