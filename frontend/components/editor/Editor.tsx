import { getDocById, updateDocById } from '@/api/docs'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
// import Markdown from './Markdown.mdx'
import MarkDown from 'react-markdown'
import { useQuery } from 'react-query'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { Button } from '../ui/button'
import { UserRoundPlus } from 'lucide-react'
import AddCollaborator from '../AddCollaborator'

interface props {
    id: string
}

const Editor: React.FC<props> = ({ id }) => {
    const [value, setValue] = useState("")
    const { data, isError, isLoading } = useQuery("doc", async () => await getDocById(id), {
        onSuccess: (d) => {
            console.log(d)
            setValue(d.message.content)
        },
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false
    })

    const Update = async () => {
        const res = await updateDocById(id, value)
        console.log(res)
    }

    return (
        <div className='grid w-full h-full grid-cols-2 grid-rows-1'>
            <div className='w-full h-screen flex flex-col border-r border-secondary'>
                <div className='w-full h-full'>
                    <div className='w-full h-[50px] flex items-center'>
                        <Button onClick={()=>Update()} className='ml-auto mr-3 ' size={"lg"}>Save</Button>
                        <AddCollaborator />
                    </div>
                    <textarea
                        autoFocus
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className='w-full p-10 bg-gray-100 dark:bg-black outline-none  h-full font-inter text-xl'
                        placeholder='Enter markdown here'
                    >
                    </textarea>
                </div>

            </div>
            <MarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} className='prose dark:prose-invert   max-w-none w-full h-screen overflow-auto p-10'>
                {value}
            </MarkDown>

        </div>
    )
}


export default Editor