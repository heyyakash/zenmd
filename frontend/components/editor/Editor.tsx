import React, { FC, useState } from 'react'
// import Markdown from './Markdown.mdx'
import MarkDown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

const Editor = () => {
    const [value, setValue] = useState("")
    return (
        <div className='grid w-full h-full grid-cols-2 grid-rows-1'>
            <div className='w-full h-screen'>
                <textarea
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='w-full p-10 bg-gray-100 dark:bg-black outline-none border-r-2 border-secondary h-full font-inter text-xl'
                    placeholder='Enter markdown here'
                >

                </textarea>
            </div>
            <MarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}  className='prose dark:prose-invert   max-w-none w-full h-screen overflow-auto p-10'>
             {value}
            </MarkDown>
            
        </div>
    )
}


export default Editor