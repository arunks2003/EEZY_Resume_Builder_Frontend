import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { updateResumeDetail } from '../../../../../service_api/GlobalApi';
// import { toast } from 'sonner';
import { useToast } from "@/components/ui/use-toast"
import { LoaderCircle } from 'lucide-react';

const formFields = {
    universityName: '',
    degree: '',
    startDate: '',
    endDate: '',
    major: ''
};

function EducationForm() {
    const { toast } = useToast()
    const [educationList, setEducationList] = useState([formFields]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.education.length > 0) {
            setEducationList(resumeInfo?.education);
        }
    }, []);

    const handleChange = (index, event) => {
        const newEntries = educationList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationList(newEntries);
    };

    const addEducation = () => {
        setEducationList([...educationList, { formFields }]);
    };

    const removeEducation = () => {
        setEducationList(educationList => educationList.slice(0, -1));
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationList
        });
    }, [educationList, setResumeInfo]);

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                education: educationList.map(({ id, ...rest }) => rest)
            }
        };

        updateResumeDetail(params.resumeId, data).then(res => {
            setLoading(false);
            toast({
                title: "Education updated",
            });
            // console.log(res)
            console.log(data)
        }).catch(error => {
            setLoading(false);
        });
    };

    return (
        <div className='p-5 shadow-lg border-t-primary border-t-4'>
            <h2 className='font-bold text-lg'>Education:</h2>
            <p>Add your Education.</p>
            {educationList.map((item, index) => (
                <div key={index}>
                    <div className='grid grid-cols-2 gap-2 border p-3 rounded-lg mt-5'>
                        <div className='col-span-2'>
                            <label>University</label>
                            <Input name="universityName" value={item.universityName} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label>Degree</label>
                            <Input name="degree" value={item.degree} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label>Major</label>
                            <Input name="major" value={item.major} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label>Start Date</label>
                            <Input name="startDate" value={item.startDate} type="date" onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label>End Date</label>
                            <Input name="endDate" value={item.endDate} type="date" onChange={(e) => handleChange(index, e)} />
                        </div>
                    </div>
                </div>
            ))}
            <div className='flex justify-between mt-2'>
                <div className='flex gap-2'>
                    <Button variant="outline" className="text-primary" onClick={addEducation}>+ Add More</Button>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:text-red-950" onClick={removeEducation}>- Remove</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default EducationForm;
