import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MdBookmark } from 'react-icons/md';

const Projects = () => {

  const [filtered, setFiltered] = useState(null);
  const projects = useSelector((state) => state.projects?.projects)
  const searchTerms = useSelector(state => state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : "")

  useEffect(() => {
    if (searchTerms?.length > 0) {

      const filterDtata= projects?.filter((project) => {
        // console.log("Fileterd..........", project);
        const lowerCaseItem = project?.title.toLowerCase()
        return searchTerms.split("").every((letter) => lowerCaseItem.includes(letter))
      })
      setFiltered(filterDtata)
    } else {
      setFiltered(null)
    }

  }, [searchTerms]);


  return (
    <div className='w-full py-6 flex items-center justify-center gap-6 flex-wrap'>
      {
        filtered ? (<> {
          filtered && filtered.map((project, index) =>
            <ProjectCard key={project.id} project={project} index={index} />
          )}
        </>
        ) : (
          <>
            {
              projects && projects.map((project, index) =>
                <ProjectCard key={project.id} project={project} index={index} />
              )}
          </>
        )

      }
    </div>
  )
}

const ProjectCard = (project, index) => {
  return <motion.div
    key={index}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, delay: index * 0.5 }}
    className='w-full cursor-pointer md:w-[400px] h-[355px] bg-secondary rounded-md p-5 flex items-center justify-center gap-4'>

    <div className='bg-primary flex flex-col w-full h-full rounded-md overflow-hidden '
      style={{ overflow: "hidden", height: "100%" }}>
      <iframe
        title='Result'
        srcDoc={project?.project?.output}
        style={{ border: "none", widows: "100%", height: "100%", }}

      />

      <div className='flex -mb-5 items-center justify-start gap-3 w-full'>

        {/* image */}
        <div className='w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500'>
          {
            project?.project?.user?.photoURL ? (

              <motion.img
                whileHover={{ scale: 1.2 }}
                src={project?.project?.user?.photoURL}
                alt={project?.project?.user?.displayName}
                referrerPolicy='no-referrer'
                className='w-full h-full object-cover'
              />

            ) : (
              <p className='text-xl text-white font-semibold capitalize'>
                {project?.user?.email[0]}
              </p>
            )}
        </div>

        {/* name */}

        <div >

          <p className='text-white text-lg capitalize '>{project?.project?.title}</p>
          {console.log("Project title now", project?.project)}
          <p className='text-primaryText text-sm'>
            {project?.project?.user?.displayName ? project?.project?.user?.displayName : `${project?.project?.user?.email.split("@")[0]}`}
          </p>

        </div>
      </div>

      <motion.div className='cursor-pointer ml-auto' whileInView={{ scale: 0.9 }}>
        <MdBookmark className='text-primaryText text-3xl' />
      </motion.div>

    </div>
  </motion.div >
};

export default Projects