import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa6';
import { FcSettings } from 'react-icons/fc';
import SplitPane from 'react-split-pane';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Link } from 'react-router-dom';
import { Logo } from '../assets';
import { AnimatePresence, motion } from 'framer-motion';
import { MdCheck, MdEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import UserProfileDetails from './../components/UserProfileDetails';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import Alert from './../components/Alert';

const NewProject = () => {
    const [html, setHtml] = useState("")
    const [css, setCss] = useState("")
    const [js, setJs] = useState("")
    const [output, setOutput] = useState("")
    const [title, setTitle] = useState("Untitled")
    const [isTitle, setIsTitle] = useState("")
    const [alert, setAlert] = useState(false)

    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        updateOutput()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [html, css, js]);

    const updateOutput = () => {
        const combineOutput = `
        <html>
        <head>
        <style>${css}</style>
        </head>
        <body>${html}</body>
        <script>${js}</script>
        </html>
        `;
        setOutput(combineOutput)
    }

    const saveProgram = async () => {
        const id = `${Date.now()}`
        const _doc = {
            id: id,
            title: title,
            html: html,
            css: css,
            js: js,
            output: output,
            user: user
        }

        await setDoc(doc(db, "Projects", id), _doc).then((res) => {
           res.setAlert(true)
           alert("Project saved successfully")
            
        }).catch((err) => {
            console.log(err);
            
        })
        setInterval(() => {
            setAlert(false)
        }, 2500);
    }



    return <>
        <div className='w-full h-full flex flex-col items-start justify-start overflow-hidden'>
            {/* Alert section */}

            <AnimatePresence>
                {alert && <Alert status={"Success"} alertMsg={"Project Saved..."} />}
            </AnimatePresence>

            {/* Header Section */}

            <header className='w-full flex items-center justify-between  gap-8 '>
                <div className='w-full flex items-center '>
                    <div className='flex justify-center items-center gap-6'>
                        <Link to={"/home/projects"}>
                            <img src={Logo} alt='logo' className='object-contain w-28 h-auto ' />
                        </Link>
                    </div>

                    <div className='flex flex-col items-start justify-start'>

                        {/* title */}
                        <div className='flex justify-center items-center gap-3'>
                            <AnimatePresence>
                                {isTitle ? <>
                                    <motion.input
                                        key={"TitleInput"}
                                        type='text'
                                        placeholder='Your Title'
                                        className='px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none'
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                    />


                                </> : <>
                                    <motion.p key={"titleLable"} className='px-3 py-2 text-white text-lg'>
                                        {title}
                                    </motion.p>
                                </>
                                }
                            </AnimatePresence>

                            <AnimatePresence>
                                {isTitle ? <>
                                    <motion.div key={"MdCheck"}
                                        whileTap={{ scale: 0.9 }}
                                        className='cursor-pointer'
                                        onClick={() => {
                                            setIsTitle(false)
                                        }}>
                                        <MdCheck
                                            className='text-2xl text-emerald-500' />
                                    </motion.div>
                                </> : <>
                                    <motion.div key={"MdEdit"}
                                        whileTap={{ scale: 0.9 }}
                                        className='cursor-pointer'
                                        onClick={() => {
                                            setIsTitle(true)
                                        }}>
                                        <MdEdit className='text-2xl text-primaryText' />
                                    </motion.div>

                                </>
                                }
                            </AnimatePresence>
                        </div>


                        {/* follow section */}
                        <div className='flex items-center justify-center px-3 -mt-2 gap-2'>
                            <p className='text-primaryText text-sm'>
                                {user?.displayName ? user?.displayName : `${user?.email.split("@")[0]}`}
                            </p>
                            <motion.p whileTap={{ scale: 0.9 }} className='text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer'>
                                +Follow
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* user section */}

                {user && (
                    <div className='flex items-center justify-center gap-4 px-4'>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={saveProgram}
                            className='px-6 py-3 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md'>
                            Save
                        </motion.button>
                        <UserProfileDetails />
                    </div>
                )}

            </header>

            {/* Coding Section */}

            <div className='w-screen h-screen flex items-center justify-center'>

                {/* Horizontal section */}
                <SplitPane
                    split='horizontal'
                    minSize={100}
                    maxSize={-100}
                    defaultSize={"50%"}

                >
                    {/* top coding section */}
                    <SplitPane split='vertical' minSize={500}>
                        {/* html code here */}
                        <div className='w-full h-full flex flex-col items-start justify-start '>
                            <div className='w-full flex items-center justify-between'>
                                <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                                    <FaHtml5 className='text-red-500 text-xl' />
                                    <p className='text-primaryText font-semibold '>HTML5</p>
                                </div>
                                {/* icons */}
                                <div className='cursor-pointer flex items-center justify-center gap5 px-4'>
                                    <FcSettings className='text-xl' />
                                    <FaChevronDown className='text-xl text-primaryText' />
                                </div>
                            </div>
                            <div className='w-full px-2 overflow-hidden'>
                                <CodeMirror
                                    value={html}
                                    height="600px"
                                    theme={"dark"}
                                    extensions={[javascript({ jsx: true })]}
                                    onChange={(value, viewUpdate) => {
                                        setHtml(value)
                                    }}
                                />
                            </div>
                        </div>

                        <SplitPane split='vertical' minSize={500}>
                            {/* CSS Code here */}
                            <div className='w-full h-full flex flex-col items-start justify-start '>
                                <div className='w-full flex items-center justify-between'>
                                    <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                                        <FaCss3 className='text-sky-500 text-xl' />
                                        <p className='text-primaryText font-semibold '>CSS3</p>
                                    </div>
                                    {/* icons */}
                                    <div className='cursor-pointer flex items-center justify-center gap5 px-4'>
                                        <FcSettings className='text-xl' />
                                        <FaChevronDown className='text-xl text-primaryText' />
                                    </div>
                                </div>
                                <div className='w-full px-2 overflow-hidden'>
                                    <CodeMirror
                                        value={css}
                                        height="600px"
                                        theme={"dark"}
                                        extensions={[javascript({ jsx: true })]}
                                        onChange={(value, viewUpdate) => {
                                            setCss(value)
                                        }}
                                    />
                                </div>
                            </div>


                            <SplitPane split='vertical' minSize={500}>

                                {/* JS code here */}

                                <div className='w-full h-full flex flex-col items-start justify-start'>
                                    <div className='w-full flex items-center justify-between'>
                                        <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                                            <FaJs className='text-yellow-500 text-xl' />
                                            <p className='text-primaryText font-semibold '>JS</p>
                                        </div>
                                        {/* icons */}
                                        <div className='cursor-pointer flex items-center justify-center gap5 px-4'>
                                            <FcSettings className='text-xl' />
                                            <FaChevronDown className='text-xl text-primaryText' />
                                        </div>
                                    </div>
                                    <div className='w-full px-2 overflow-hidden'>
                                        <CodeMirror
                                            value={js}
                                            height="600px"
                                            theme={"dark"}
                                            extensions={[javascript({ jsx: true })]}
                                            onChange={(value, viewUpdate) => {
                                                setJs(value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </SplitPane>

                        </SplitPane>

                    </SplitPane>

                    {/* bottom result section */}
                    <div className='bg-white w-full h-full flex items-center justify-center mb-10'
                        style={{ overflow: "scroll", height: "100%"}}>
                        <iframe
                            title='Result'
                            srcDoc={output}
                            style={{ border: "none", widows: "100%", height: "100%" }}
                        />
                    </div>
                </SplitPane>
            </div>
        </div>
    </>


}

export default NewProject;