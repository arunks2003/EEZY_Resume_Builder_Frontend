import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { updateResumeDetail } from '../../../../../service_api/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { Brain, Leaf, LoaderCircle } from 'lucide-react'
// import AIchatSession from '../../../../../service_api/AiModel'


const prompt = `Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format`;
const Summary = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summary, setSummary] = useState(resumeInfo?.summary);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummary, setAiGeneratedSummary] = useState()
    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            data: {
                summary: summary
            }
        }
        console.log(params.resumeId)
        updateResumeDetail(params?.resumeId, data).then(res => {
            console.log(res)
            enableNext(true);
            setLoading(false);
            toast({
                title: "Done",
                description: "Data added to your document.",
            })
        }, (error) => { loading(false) });
        enableNext(true)
    }

    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo,
            summary: summary
        })
    }, [summary])

    return (
        <div>
            <div className='p-5 shadow-lg border-t-primary border-t-4'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add a summary of your job title.</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end mb-4'>
                        <label htmlFor="">Add Summary</label>
                        {/* <Button className="border-primary text-primary flex gap-1" type='button' size="sm" variant="outline" onClick={generateSummaryFromAi}><Leaf className='h-5 w-5'></Leaf>Generate with AI</Button> */}
                    </div>
                    <Textarea required placeholder="Type your message here." value={summary} onChange={(e) => setSummary(e.target.value)} />
                    <div className='mt-2 flex justify-end' disabled={loading}><Button type='submit'>{loading ? <LoaderCircle className='animate-spin'></LoaderCircle> : 'Save'}</Button></div>
                </form>
            </div>
        </div>
    )
}

export default Summary
