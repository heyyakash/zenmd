import React, { FC, useState } from 'react'
// import Markdown from './Markdown.mdx'
import MarkDown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

const Editor = () => {
    const [value, setValue] = useState("")
    return (
        <main className='grid w-full h-screen grid-cols-2 grid-rows-1'>
            <div className='w-full h-screen'>
                <textarea
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='w-full p-10 bg-secondary outline-none h-full font-inter text-xl'
                    placeholder='Enter markdown here'
                >

                </textarea>
            </div>
            <MarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}  className='prose prose-2xl dark:prose-invert max-w-none w-full h-screen overflow-auto p-10'>
             {value}
            </MarkDown>
            
        </main>
    )
}


export default Editor