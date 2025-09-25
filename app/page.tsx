'use client'
import { ArrowUpRight, ListChecks } from "lucide-react";
import Image from "next/image";
import { color, motion } from "framer-motion"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [tab, setTab] = useState('client');
  const router = useRouter();
  return (
    <div className="md:min-h-screen min-h-[60vh] overflow-hidden relative flex flex-col">
    {/* <img src="/ui.png" className="z-10 pointer-events-none opacity-50 absolute w-full h-full top-0" alt="" /> */}
    
    <div className="grid grid-cols-1 align-top lg:grid-cols-2 md:min-h-screen min-h-[90vh] w-full relative z-0 gap-4 sm:gap-8 lg:gap-24 p-4 sm:p-6 lg:p-9">
      
      {/* Left Content Section */}
      <div className="bg-white flex lg:items-end  px-4 sm:px-6 lg:px-7">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 w-full">
          
          {/* Badge/Header */}
          <div className="flex flex-row gap-2 sm:gap-3 shadow-xl lg:shadow-2xl border border-neutral-300 rounded-full w-fit p-1.5 sm:p-2  lg:mx-0">
            <span className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm sm:text-base">
              <ListChecks className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6"/>
            </span>
            <span className="w-36 sm:w-40 lg:w-[180px] text-neutral-600 leading-[1.2] text-xs sm:text-sm lg:text-base font-medium content-center lg:text-left">
              Master Your Workload With Our Platform
            </span>
            <span className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6"/>
            </span>
          </div>
          
          {/* Main Heading */}
          <div className="flex flex-col  lg:text-left">
            
            <div className=" relative md:top-3 after:bg-white after:w-[110%] after:h-full after:absolute after:top-[100%] after:left-0">
              <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[6.6rem] leading-[1.1] text-neutral-700 font-medium font-funnel whitespace-nowrap relative "
              initial={{ y: '50px', opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }} 
              
              >
                Data Refined,
              </motion.h1>
            </div>
            <div className=" relative after:bg-white after:w-[110%] after:h-full after:absolute after:top-[100%] after:left-0  whitespace-nowrap">
              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[6.6rem] leading-[1.2] text-neutral-700 font-medium font-funnel "
              initial={{ y: '50px', opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9,delay:0.3 }} 
              >
                Insights Defined
              </motion.h1>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Right Blue Section */}
      <div className="rounded-2xl sm:p-4 p-2 flex flex-col gap-2 items-center justify-center sm:rounded-3xl lg:rounded-4xl bg-blue-600 min-h-[200px] sm:min-h-[300px] lg:min-h-0 lg:ml-0 xl:ml-10 2xl:ml-20 order-1 lg:order-1">
        <div className="p-2 bg-white rounded-2xl flex flex-row gap-1 md:w-[400px] w-full">
          
          <div onClick={() => router.push('/dashboard')} className={` hover:border border-neutral-400 cursor-pointer bg-neutral-200 h-18 w-full content-center text-center   rounded-lg `}>
            <span>Dashboard</span>
            {/* <p className="text-neutral-600">complete your tasks.</p> */}
          </div>
        </div>
        <div className="p-2 bg-white rounded-2xl flex flex-row gap-1 md:w-[400px] w-full">
          <div onClick={() => setTab('client')} className={` ${tab == 'client'? 'bg-blue-100 text-blue-600 border border-blue-600':'bg-neutral-200'} h-18  w-full content-center text-center   rounded-l-lg `}>
            <span>Client</span>
          </div>
          <div onClick={() => setTab('team')} className={`${tab == 'team'? 'bg-blue-100 text-blue-600 border border-blue-600':'bg-neutral-200'} h-18 w-full content-center text-center   rounded-r-lg `}>
            <span>Team</span>
            {/* <p className="text-neutral-600">complete your tasks.</p> */}
          </div>
        </div>
        {  tab == "client" ? 
        <div className="p-2 bg-white rounded-2xl flex flex-col gap-1 md:w-[400px] w-full">
          <label htmlFor="" className="text-sm py-2 capitalize text-neutral-600">track your project.</label>
            <Input type='email' placeholder="email"  className="h-14 w-full " />
        </div>
          :
          <div className="p-2 bg-white rounded-2xl flex flex-col gap-2 md:w-[400px] w-full">
          <label htmlFor="" className="text-sm py-2 capitalize text-neutral-600">track your project.</label>
            <Input type='email' placeholder="email"  className="h-14 w-full " />
            <Input type='password' placeholder="password"  className="h-14 w-full " />
        </div>
        }

      </div>
      
    </div>
  </div>
  
  );
}
