import React, { act, useEffect, useState } from 'react'
import PersonalDetails from './form/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summary from './form/Summary'
import ExperienceForm from './form/ExperienceForm'
import ProjectsForm from './form/ProjectsForm'
import EducationForm from './form/EducationForm'
import SkillsForm from './form/SkillsForm'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import ViewResume from '@/resumes/[resumeId]/view/ViewResume'
import ThemeColor from './ThemeColor'

const FormSection = () => {
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const navigate = useNavigate();
    const [enableNext, setEnableNext] = useState(false);
    const { resumeId } = useParams();
    // useEffect(() => {
    //     console.log(activeFormIndex);
    // }, [activeFormIndex])

    return (
        <div>
            <div className='flex justify-between items-center mb-2'>
                <div className='flex gap-5'>
                    <Link to={"/dashboard"}>
                        <Button><Home /></Button>
                    </Link>
                    <ThemeColor />
                </div>
                {/* <Button variant="outline" size="sm" className="flex, gap-2"><LayoutGrid></LayoutGrid>Theme</Button> */}
                <div className='flex gap-2'>
                    {activeFormIndex > 1 && <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}><ArrowLeft></ArrowLeft></Button>}
                    <Button disabled={!enableNext} className="flex gap-2" size="sm" onClick={() => setActiveFormIndex(activeFormIndex + 1)}>
                        Next <ArrowRight></ArrowRight>
                    </Button>
                </div>
            </div>
            {/* Personal Details */}
            {activeFormIndex == 1 ?
                <PersonalDetails enableNext={(v) => setEnableNext(v)}></PersonalDetails> : null}

            {activeFormIndex == 2 ? <Summary enableNext={(v) => setEnableNext(v)}></Summary> : null}

            {/* Summar */}

            {activeFormIndex == 3 ? <ExperienceForm enableNext={(v) => setEnableNext(v)}></ExperienceForm> : null}

            {/* Experience */}

            {/* Proects */}

            {/* Position of responsibility */}

            {activeFormIndex == 4 ? <ProjectsForm enableNext={(v) => setEnableNext(v)}></ProjectsForm> : null}

            {/* Education */}
            {activeFormIndex == 5 ? <EducationForm enableNext={(v) => setEnableNext(v)}></EducationForm> : null}

            {/* skills */}
            {activeFormIndex == 6 ? <SkillsForm enableNext={(v) => setEnableNext(v)}></SkillsForm> : null}


            {activeFormIndex == 7 ? <Navigate to={'/resumes/' + resumeId + '/view'}></Navigate> : null}
        </div>
    )
}

export default FormSection
