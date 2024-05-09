'use client'


import { useState,useEffect } from "react";
import { connectWallet } from "../utils/connectWallet";
import Web3Context from "../context/Web3Context";
import WebButton from "./ui/WebButton";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";
import { toast } from "react-hot-toast";
// import "./Wallet.css";


const Wallet =({children})=>{
 const [state,setState]=useState({
    provider:null,
    account:null,
    supplyContract:null,
    chianId:null
 })
 const [isLoading,setIsLoading]=useState(false);
 
 useEffect(()=>{
   window.ethereum.on('accountsChanged',()=>handleAccountChange(setState))
   window.ethereum.on('chainChanged',()=>handleChainChange(setState)) 
   
   return()=>{
    window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setState))
    window.ethereum.removeListener('chainChanged',()=>handleChainChange(setState)) 
   }
},[])
 const handleWallet = async()=>{
    try{
        setIsLoading(true);
        const { provider,selectedAccount,supplyContract,chainId} = await connectWallet();
        setState({provider,selectedAccount,supplyContract,chainId})

    }catch(error){
       toast.error("Error connecting wallet")
       console.error(error.message)
    }finally{
        setIsLoading(false)
    }
 }
 return (
   <div className="flex flex-col justify-center items-center">
         <WebButton className='mt-[24px] w-[500px]' onClick={handleWallet} type="button" label="Connect Wallet" />
     <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
     {isLoading && <p>Loading...</p>}
    
   </div>
 )
}
export default Wallet;