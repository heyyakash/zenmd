import { Menu, Search, StickyNote } from 'lucide-react'
import React, { ReactNode } from 'react'
import { Input } from '../ui/input'
import { ModeToggle } from '../ui/Toggle'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { useRouter } from 'next/router'
import Editor from '../editor/Editor'

interface props {
    children :ReactNode
}

const Dashboard: React.FC<props> = (props) => {
    const router = useRouter()
    const logout = () => {
        document.cookie = `token= ;secure=true; path=/`
        router.push('/login')
    }
    const tree  = {
        Main:["Graph","Tree","Arrays"],
        AWS: ["Ingress", "S3"],
        DevOps : ["Terraform"]
    }
    return (
        <div className='w-full h-screen flex flex-col'>
            <div className='h-[70px] border-b border-secondary grid grid-rows-1 grid-cols-3 items-center p-4'>

                <div className='flex items-center gap-4 w-full'>
                    <Menu cursor={"pointer"} />
                    <div className="flex gap-2 items-center text-primary text-[1.5rem] font-medium ">
                        <StickyNote size={"30px"} /> ZenMD
                    </div>
                </div>

                <div className='flex gap-2 items-center  px-2 rounded-lg'>
                    <Search />
                    <Input placeholder='Search your notes' className='border border-primary' type="text" />
                </div>

                <div>
                    <div className='flex gap-2 ml-auto w-[90px] items-center '>
                        <ModeToggle />
                        <Popover>
                            <PopoverTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='mr-2 border-secondary flex flex-col gap-3'>
                                <div className='w-full grid grid-cols-2 rounded-lg overflow-hidden grid-rows-1'>
                                    <img src="https://github.com/shadcn.png" alt="" />
                                    <div className='bg-primary flex flex-col justify-center text-white items-center'>
                                        <h2 className='text-4xl'>24</h2>
                                        <p>Notes</p>
                                    </div>
                                </div>
                                <Button variant={"secondary"} size = {"lg"} className='w-full'>Settings</Button>
                                <Button onClick={()=>logout()} variant={"destructive"} size = {"lg"} className='w-full bg-primary'>Logout</Button>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

            </div>
            <div className='w-full h-full flex'>
                <aside className='w-[350px] h-full border-r border-secondary'></aside>
                {props.children}
            </div>
        </div>
    )
}

export default Dashboard