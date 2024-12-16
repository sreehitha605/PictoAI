import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from "motion/react"

const Testimonials = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{ opacity: 1 ,y:0}}
    viewport={{once:true}}>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer Reviews</h1>
        <p className='text-gray-500 mb-8'>What our users are saying</p>

        <div className='flex justify-center gap-6'>
            {testimonialsData.map((testimonial,index)=>(
                <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md w-full 
                sm:w-80 md:w-80 lg:w-80 m-auto cursor-pointer hover:scale-[1.03] transition-all'>

                    <div className='flex flex-col items-center'>
                        <img src={testimonial.image} alt="" className='rounded-full w-14'/>
                        <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                        <p className='text-teal-500 mb-4'>{testimonial.role}</p>
                        <div className='flex mb-4'>
                            {Array(testimonial.stars).fill().map((item,index)=>(
                                    <img key={index} src={assets.rating_star} alt="" />
                            ))}
                        </div>
                        <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
                    </div>
                </div>
            ))}
        </div>

    </motion.div>
  )
}

export default Testimonials