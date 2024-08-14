import { Loader2, PlusCircle, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/clerk-react';
import { createNewResume } from '../../../service_api/GlobalApi';
import { useNavigate } from 'react-router-dom';


const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();

    const onCreate = () => {
        setLoading(true);
        const uuid = uuidv4();
        const data = {
            data: {
                title: resumeTitle,
                resume_id: uuid,
                user_email: user?.primaryEmailAddress?.emailAddress,
                user_name: user?.fullName
            }
        }
        createNewResume(data).then(res => {
            console.log(res);
            if (res) { setLoading(false); navigate('/dashboard/resume/' + uuid + '/edit') }
        }, (err) => { setLoading(false); console.log(err) })
    }

    return (
        <div>
            <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg
             hover:scale-105 transition-all hover:shadow-md cursor-pointer h-[270px] border-dashed'
                onClick={() => setOpenDialog(true)}>
                <PlusCircle></PlusCircle>
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Want to create new Resume?</DialogTitle>
                        <DialogDescription>
                            <p>Title for your resume</p>
                            <Input type="text" className="my-2" placeholder="Ex: Software Developer" onChange={(e) => setResumeTitle(e.target.value)} />
                            <div className='flex flex-row gap-2 justify-end'>
                                <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button onClick={() => onCreate()} disabled={!resumeTitle || loading}>
                                    {loading ? <Loader2 className='animate-spin' /> : 'Create'}
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default AddResume
