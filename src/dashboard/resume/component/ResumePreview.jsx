import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonDetailPreview from './priview/PersonDetailPreview'
import SummaryPreview from './priview/SummaryPreview.jsx'
import Experience from './priview/Experience'
import Education from './priview/Education'
import Skills from './priview/Skills'
import Projects from './priview/Projects'

const ResumePreview = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    return (
        <div className='shadow-lg h-full p-9 border-t-[20px]' style={{ borderColor: resumeInfo?.themeColor }}>
            {/* Person Detail */}
            <PersonDetailPreview resumeInfo={resumeInfo}></PersonDetailPreview>
            {/* Summary */}
            <SummaryPreview resumeInfo={resumeInfo}></SummaryPreview>
            {/* Profession experience */}
            <Experience resumeInfo={resumeInfo}></Experience>
            {/*Projects */}
            <Projects resumeInfo={resumeInfo}></Projects>
            {/* Education */}
            <Education resumeInfo={resumeInfo}></Education>
            {/* Skills */}
            <Skills resumeInfo={resumeInfo}></Skills>
            {/*Achievements */}
        </div>
    )
}

export default ResumePreview
