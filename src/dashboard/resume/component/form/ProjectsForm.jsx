import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { updateResumeDetail } from '../../../../../service_api/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import TextEditor from '../TextEditor'
import { useToast } from "@/components/ui/use-toast"


const formFields = {
    title: '',
    startDate: '',
    endDate: '',
    workSummary: '',
}
function ProjectsForm() {
    const { toast } = useToast()
    const [projectList, setprojectList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo?.projects.length > 0 && setprojectList(resumeInfo?.projects)

    }, [])

    const handleChange = (index, event) => {
        const newEntries = projectList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        console.log(newEntries)
        setprojectList(newEntries);
    }

    const AddNewExperience = () => {

        setprojectList([...projectList, {
            title: '',
            startDate: '',
            endDate: '',
            workSummary: '',
        }])
    }

    const RemoveExperience = () => {
        setprojectList(projectList => projectList.slice(0, -1))
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = projectList.slice();
        newEntries[index][name] = e.target.value;

        setprojectList(newEntries);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            projects: projectList
        });

    }, [projectList]);


    const onSave = () => {
        setLoading(true)
        const data = {
            data: {
                projects: projectList.map(({ id, ...rest }) => rest)
            }
        }

        console.log(projectList)

        updateResumeDetail(params?.resumeId, data).then(res => {
            console.log("Projects added", res);
            setLoading(false);
            toast({
                title: "Projects updated",
            });
            console.log(data)
        }, (error) => {
            setLoading(false);
        })

    }
    return (
        <div>
            <div className='p-5 shadow-lg border-t-primary border-t-4'>
                <h2 className='font-bold text-lg'>Projects: </h2>
                <p>Add your projects</p>
                <div>
                    {projectList.map((item, ind) => (
                        <div>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs pb-2 font-bold'>Project Title:</label>
                                    <Input name="title" defaultValue={item.title} onChange={(e) => handleChange(ind, e)}></Input>
                                </div>
                                <div>
                                    <label className='text-xs pb-2 font-bold'>Start Date:</label>
                                    <Input type="date" defaultValue={item.startDate} name="startDate" onChange={(e) => handleChange(ind, e)}></Input>
                                </div>
                                <div>
                                    <label className='text-xs pb-2 font-bold'>End Date:</label>
                                    <Input type="date" name="endDate" defaultValue={item.endDate} onChange={(e) => handleChange(ind, e)}></Input>
                                </div>
                                <div className='col-span-2'>
                                    <TextEditor
                                        index={ind}
                                        defaultValue={item?.workSummary}
                                        onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummary', ind)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" className="text-primary" onClick={AddNewExperience}> + Add More Projects</Button>
                        <Button variant="outline" className="border-red-500 text-red-500 hover:text-red-950" onClick={RemoveExperience}> - Remove</Button>
                    </div>

                    <Button disabled={loading} onClick={() => onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProjectsForm
