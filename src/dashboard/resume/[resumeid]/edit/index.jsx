import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../component/FormSection';
import ResumePreview from '../../component/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import { getResumeById } from '../../../../../service_api/GlobalApi';
import ViewResume from '@/resumes/[resumeId]/view/ViewResume';

const EditResume = () => {
    const params = useParams();
    const [resumeInfo, setResumeInfo] = useState(dummy)
    useEffect(() => {
        console.log(params?.resumeId)
        getResumeInfoFromDB();
    }, [])

    const getResumeInfoFromDB = () => {
        getResumeById(params?.resumeId).then((res) => { console.log(res.data.data); setResumeInfo(res.data.data.attributes) })
    }
    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                {/* Form Section */}
                <FormSection></FormSection>
                {/*Review section*/}
                <ResumePreview></ResumePreview>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default EditResume
