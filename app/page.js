'use client'
import {useEffect, useState} from "react";
export default  function Home() {
  const [data,setData]=useState();
  useEffect(()=>{
    const fetchCategories=async ()=>{
      const response=await  fetch('api/categories');
      const data=await  response.json();
      console.log(data)
    }
    fetchCategories()
  },[])
  return (
    <><h1>hossen</h1></>
  );
}
