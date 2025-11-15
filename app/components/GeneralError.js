'use client'
import '@/app/styles/globalError.css'
const GeneralError=({reset})=>{
    return (<>
        <main className="bsod container">
            <h1 className="neg title"><span className="bg">Error - 404</span></h1>
            <p>An error has occured, to continue:</p>
            <p>* Return to our homepage.<br/>
                * Send us an e-mail about this error and try later.</p>
            <nav className="nav">
                <button className='cursor-pointer' onClick={()=>{
                    reset()
                }} >refresh</button>
            </nav>
        </main>
    </>)
}
export default GeneralError;