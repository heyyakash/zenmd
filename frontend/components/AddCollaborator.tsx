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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { addCollaborator } from '@/api/docs'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem } from './ui/form'
import { toast } from 'sonner'

interface props {
    id: string
}

const AddCollaborator: React.FC<props> = ({ id }) => {
    const [loading, setLoading] = useState(false)
    const FormSchema = z.object({
        email: z
            .string({
                required_error: "Please enter an email.",
            })
            .email(),
        permission: z
            .string({
                required_error: "Please select permission"
            })

    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const SendInvitation = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
        setLoading(true)
        const res = await addCollaborator(id, data.email, data.permission)
        toast.success(res.message)
        setLoading(false)
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(SendInvitation)}>
                        <Label>Email Address</Label>
                        <div className='flex gap-3 items-center'>
                            {/* <FormField
                                control={form.control}
                                name="email",
                                render={({ field }) => (
                                    <FormItem>
                                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='johndoe@gmail.com ' />
                                    </FormItem>
                                )}
                            /> */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                
                                        <Input value={field.value} onChange={field.onChange} type="email" placeholder='johndoe@gmail.com ' />
                 
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="permission"
                                render={({ field }) => (
                    
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue placeholder="Permission" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Permission</SelectLabel>
                                                    <SelectItem value="r">Read Only</SelectItem>
                                                    <SelectItem value="rw">Read and Write</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                )}
                            />

                        </div>

                        <Button type='submit' className='mt-2 w-full bg-secondary'>Add +</Button>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default AddCollaborator