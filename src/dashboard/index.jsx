import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import { getUserResume } from '../../service_api/GlobalApi'
import ResumeItemCard from './components/ResumeItemCard'

const Dashboard = () => {
    const { user } = useUser();
    const [resumeList, setResumeList] = useState([]);

    //----------get users resumes created till
    const getResumeList = async () => {
        getUserResume(user?.primaryEmailAddress?.emailAddress)
            .then((res => setResumeList(res.data.data)))
    }

    useEffect(() => { user && getResumeList() }, [user])
    return (
        <div className='p-10 md:px-20 lg:px-32'>
            <h2 className='font-bold text-3xl'>My Resume</h2>
            <p>Start Creating Your Resume</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-5 gap-3'>
                <AddResume></AddResume>
                {resumeList.length > 0 && resumeList.map((resume, ind) => (
                    <ResumeItemCard resume={resume} key={ind}></ResumeItemCard>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
