import Header from "@/app/components/Header";

const Main=({children})=>{
    return (<>
        <main className='w-[85%]'>
            <Header/>
            {children}
        </main>
    </>)
}
export default Main