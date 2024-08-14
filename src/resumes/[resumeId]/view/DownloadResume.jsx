import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/component/ResumePreview'
import React, { useContext, useEffect, useState } from 'react'
import { getResumeById } from '../../../../service_api/GlobalApi'
import { useParams } from 'react-router-dom'
import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import dummy from '@/data/dummy'
import Header from '@/components/ui/custom/Header'

function DownloadResume() {
    const [resumeInfo, setResumeInfo] = useState(dummy)
    const { resumeId } = useParams();
    const targetRef = useRef(null);

    const getResumeInfo = async () => {
        const res = await getResumeById(resumeId);
        setResumeInfo(res.data.data.attributes);
        console.log(res.data.data.attributes);
    };

    useEffect(() => {
        getResumeInfo();
    }, [resumeId]);


    return (
        <div>
            <Header></Header>
            <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
                <div className='my-10 mx-10 md:mx-20 lg:mx-36 flex justify-center'>
                    <div ref={targetRef} style={{ width: "900px" }}>
                        {/*Review section*/}
                        <ResumePreview />
                    </div>


                </div>
            </ResumeInfoContext.Provider>
            <div className='flex justify-center gap-5 my-3'>
                <Button onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })}>Download</Button>
            </div>
        </div>
    );
}

export default DownloadResume;
