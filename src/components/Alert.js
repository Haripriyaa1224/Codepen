import React from 'react'
import { motion } from 'framer-motion'
// import {slideOut}  from '../animation'

const Alert = (status, alertMsg) => {
    return (
        <motion.div
            className='fixed top-24 right-12 z-10'>
            {
                status === "Success" && 
                    <div className='px-4 py-2 rounded-md bg-emerald-400 shadow-md shadow-emerald-500'>
                        <p className='text-lg text-primary'>{alertMsg}</p>
                    </div>
                
            }

            {
                status === "Warning" && 
                    <div className='px-4 py-2 rounded-md bg-yellow-400 shadow-md shadow-yellow-500'>
                        <p className='text-lg text-primary'>{alertMsg}</p>
                    </div>
                
            }

            {
                status === "Danger" && (
                    <div className='px-4 py-2 rounded-md bg-red-500 shadow-md shadow-red-600'>
                        <p className='text-lg text-primary'>{alertMsg}</p>
                    </div>
                )
            }
        </motion.div>
    )
}

export default Alert