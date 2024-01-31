import { FilePlus2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/router"
import { useQueryClient } from "react-query"


const Main = () => {
  const [data,setData] = useState("")
  const router = useRouter()
  const queryClient = useQueryClient()
  const createDocument = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Clicked")
    const token = localStorage.getItem('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/doc/create`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "token":token as string
      },
      body:JSON.stringify({name:data})
    })
    const result = await res.json()
    if (result.success){
      toast.success("Document Created!")
      queryClient.invalidateQueries('docs')
      router.push(`editor/${result.message}`)
    }
    else if (result.success===false && result.message==="Document already exists"){
      toast.error("Document already exists")
    }
  }

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
            </SheetHeader>
            <form className="mt-4" onSubmit={(e)=>createDocument(e)}>
              {/* <Label>Name</Label> */}
              <Input value={data} onChange={(e)=>{setData(e.target.value)}} required className="mt-2 py-4" placeholder="Enter the name of the file" type = "text" />
              <Button className="mt-3 w-full" type = "submit">Create</Button>
            </form>
          </SheetContent>
        </Sheet>

      </div>
    </>
  )
}

export default Main