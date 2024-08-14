import { Button } from '@/components/ui/button'
import Header from '@/components/ui/custom/Header'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/component/ResumePreview'
import React, { useContext, useEffect, useState } from 'react'
import { getResumeById } from '../../../../service_api/GlobalApi'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();
    const navigate = useNavigate();

    const getResumeInfo = async () => {
        const res = await getResumeById(resumeId);
        setResumeInfo(res.data.data.attributes);
        console.log(res.data.data.attributes)
    }
    const handleProceed = () => {
        console.log("successfull");
        navigate("/resumes/" + resumeId + "/download")
    }

    useEffect(() => {
        getResumeInfo();
    }, []);

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
            <div>
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>Congrats!!! Your Resume Generated Successfully.</h2>
                    <p className='text-center'>Now you can download your resume.</p>
                    <div className='flex justify-center gap-5 my-3'>
                        <Button onClick={(e) => handleProceed()}>Proceed to Download</Button>
                    </div>
                    <div>
                        {/* <ResumePreview /> */}
                    </div>
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume
