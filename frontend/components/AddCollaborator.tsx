import { UserRoundPlus } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { addCollaborator } from '@/api/docs'

interface props {
    id : string
}

const AddCollaborator : React.FC<props>= ({id}) => {
    const [email,setEmail] = useState("")
    const SendInvitation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await addCollaborator(id, email)
        console.log(res)
    }
    return (
        <Dialog>
            <DialogTrigger><Button variant={"ghost"} className='h-full'><UserRoundPlus /></Button></DialogTrigger>
            <DialogContent className='border-none p-6'>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-bold'>Add a collaborator</DialogTitle>
                    <DialogDescription>
                        Start collaborating with other people by sending them a simple invitaion and adding them to your project.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e)=>SendInvitation(e)} className='mt-2'>
                        <Label>Email Address</Label>
                        <Input value= {email} onChange={(e)=>setEmail(e.target.value)} className='mt-2' type = "email" placeholder='johndoe@gmail.com ' />
                        <Button type='submit' className='mt-2 w-full bg-secondary'>Add +</Button>
                    </form>
            </DialogContent>
        </Dialog>

    )
}

export default AddCollaborator