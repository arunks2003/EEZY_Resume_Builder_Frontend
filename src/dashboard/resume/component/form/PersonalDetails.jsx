import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateResumeDetail } from '../../../../../service_api/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

const formFields = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
}

const PersonalDetails = ({ enableNext }) => {
    const { toast } = useToast()
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    // const [formData, setFormData] = useState(resumeInfo);
    const [formData, setFormData] = useState(formFields);
    const [loading, setLoading] = useState(false);

    // useEffect(() => { console.log(params) }, [])

    const handleInputChange = (e) => {
        enableNext(false);
        const { name, value } = e.target;
        console.log(name, value)
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            [name]: value,
        }));
        console.log('Updated formData:', formData);
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Current formData:', formData); // Add logging before setting data
        const data = { data: formData };
        console.log('Data to be sent:', data); // Add logging
        updateResumeDetail(params?.resumeId, data).then(
            (res) => {
                console.log(res);
                enableNext(true);
                setLoading(false);
                toast({
                    title: "Done",
                    description: "Data added to your document.",
                });
            },
            (error) => {
                console.error('Error in personal details', error);
                setLoading(false);
            }
        );
    };
    return (
        <div className='p-5 shadow-lg border-t-primary border-t-4'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get started with filling basic information</p>

            <form action="" onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label htmlFor="">First Name: </label>
                        <Input name="firstName" defaultValue={resumeInfo.firstName} onChange={(e) => handleInputChange(e)} required></Input>
                    </div>
                    <div>
                        <label htmlFor="">Last Name: </label>
                        <Input name="lastName" defaultValue={resumeInfo.lastName} onChange={(e) => handleInputChange(e)} required></Input>
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="">Job Title: </label>
                        <Input name="jobTitle" defaultValue={resumeInfo.jobTitle} onChange={(e) => handleInputChange(e)} required></Input>
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="">Address: </label>
                        <Input name="address" defaultValue={resumeInfo.address} onChange={(e) => handleInputChange(e)} required></Input>
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="">Phone: </label>
                        <Input name="phone" defaultValue={resumeInfo.phone} onChange={(e) => handleInputChange(e)} required></Input>
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="">Email: </label>
                        <Input name="email" defaultValue={resumeInfo.email} onChange={(e) => handleInputChange(e)} required></Input>
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>{loading ? <LoaderCircle className='animate-spin'></LoaderCircle> : 'Save'}</Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetails
