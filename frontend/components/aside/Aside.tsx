import React, { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Button } from '../ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
interface File {
    id: string;
    name: string;
}

const Aside = () => {

    const files = [
        {
            id:"1",
            name:"Graphs"
        },
        {
            id:"2",
            name:"Arrays"
        },
        {
            id:"3",
            name:"Trees"
        },
    ]
      
    return (
        <aside className='max-w-[350px] w-full h-full border-r-2 border-secondary'>
            <CollapsibleBar heading = "Your Files" list = {files} />
        </aside>
    )
}

interface CollapsibleBarProps {
    heading: String
    list: (File)[]
    extraClasses?: string
}

const CollapsibleBar: React.FC<CollapsibleBarProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className=" border-b-2 border-secondary w-full space-y-2 p-2"
        >
            <div className="flex items-center justify-between space-x-4 ">
                <h4 className="text-sm font-semibold">
                    {props.heading}
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <CaretSortIcon className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2 ">
                {props.list.map((x) => {
                    return (
                        <div className="rounded-md bg-primary border truncate ... text-white dark:text-black  border-secondary hover:border-primary cursor-pointer  px-4 py-2  text-md font-medium shadow-sm">
                            {x.name}
                        </div>

                    )
                })}
            </CollapsibleContent>
        </Collapsible>
    )
}


export default Aside