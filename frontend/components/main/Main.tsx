import { FilePlus2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const Main = () => {
  return (
    <>
      <div className='flex items-center flex-col gap-3 justify-center w-full h-full'>
        <Sheet>
          <SheetTrigger>
            <FilePlus2 size={"200px"} className='text-primary' />
            <h2 className='text-xl '>Click to create a new file</h2>
          </SheetTrigger>
          <SheetContent className="border-none">
            <SheetHeader>
              <SheetTitle>Create a New File</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

      </div>
    </>
  )
}

export default Main