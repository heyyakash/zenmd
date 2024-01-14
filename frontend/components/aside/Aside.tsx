import React, { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Button } from '../ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
interface File {
    type: "File";
    id: string;
    name: string;
  }
  
  interface Folder {
    type: "Folder";
    id: string;
    name: string;
    content: (File | Folder)[];
  }

const Aside = () => {

      
      const tree: Folder[] = [
        {
          type: "Folder",
          name: "Main",
          id: "0",
          content: [
            { type: "File", id: "1", name: "Graphs" },
            { type: "File", id: "2", name: "Trees" },
            { type: "File", id: "3", name: "Arrays" },
            {
              type: "Folder",
              id: "4",
              name: "Strings",
              content: [
                { name: "Slicing", id: "5", type: "File" },
                {
                    type: "Folder",
                    id: "4",
                    name: "Strings",
                    content: [
                      { name: "Slicingdsjdksjafkldjfkladjfkldjkfjadskfjkldjkl", id: "5", type: "File" }
                    ]
                  }
              ]
            }
          ]
        }
      ];
    return (
        <aside className='w-[350px] h-full border-r-2 border-secondary'>
            {tree.map((object) => {

                return (
                    <CollapsibleBar heading={object.name} list={object.content} />
                )

            })}
        </aside>
    )
}

interface CollapsibleBarProps {
    heading: String
    list: (File | Folder)[]
    extraClasses?: string
}

const CollapsibleBar: React.FC<CollapsibleBarProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className=" border-b border-b-primary w-full space-y-2 p-2"
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
                    if(x.type==="Folder" && x.content){
                        return <CollapsibleBar heading={x.name} list={x.content} />
                    }
                    return (
                        <div className="rounded-md bg-primary border truncate  border-secondary hover:border-primary cursor-pointer  px-4 py-2  text-md font-medium shadow-sm">
                            {x.name}
                        </div>

                    )
                })}
            </CollapsibleContent>
        </Collapsible>
    )
}


export default Aside