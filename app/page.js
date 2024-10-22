"use client"
import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategorieList";
// import GlobalApi from "./_services/GlobalApi";
import { useEffect, useState } from "react";
import BusinessList from "./_components/BuisnessList";


export default function Home() {

  const [categoryList,setCategoryList]=useState([]);
  const [businessList,setBusinessList]=useState([]);
  useEffect(()=>{
    getCategoryList();
    getAllBusinessList();
  },[])


  const getCategoryList= async()=>{
    // GlobalApi.getCategory().then(resp=>{
    //   setCategoryList(resp.categories);
    // })
    const catagoriesList = await fetch('http://localhost:3000/api/categories',{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    });

    const data = await catagoriesList.json();
   
    
   
    setCategoryList(data); 

  }


  const getAllBusinessList=async ()=>{
    // GlobalApi.getAllBusinessList().then(resp=>{
    //   setBusinessList(resp.businessLists)
    // })
    const response = await fetch('http://localhost:3000/api/BuisnessList',{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    });
    
   
    const data = await response.json();
    
     
    
    setBusinessList(data) 

  }
  return (
    <div>
      <Hero/>

      <CategoryList categoryList={categoryList} />
    
      <BusinessList businessList={businessList}
      title={'Popular Business'} />
    </div>
  );
}
