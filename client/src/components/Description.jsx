import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"


const Description = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{ opacity: 1 ,y:0}}
    viewport={{once:true}}>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
        <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>

        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
            <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg' />
            <div>
                <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing AI-Powered Text to Image Generator</h2>
                <h2>
                <p className='text-teal-600 mb-4'>Unlock the power of AI with our innovative Text to Image Generator. 
                Simply describe your vision in words, and watch as cutting-edge technology 
                transforms your text into stunning, high-quality images in seconds. Whether 
                you're an artist, designer, or creator, this tool brings your ideas to life 
                with ease and precision, offering endless possibilities for creative expression.</p>
                </h2>
            </div>
        </div>
    </motion.div>
  )
}

export default Description