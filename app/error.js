'use client'
import GeneralError from "@/app/components/GeneralError";

const error = ({error,reset}) => {
    return (<>
        <GeneralError reset={reset}/>
    </>)
}
export default error;