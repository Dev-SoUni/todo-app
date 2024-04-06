import {
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
export function TodoHeader(){
  return (
  <TabsList className="grid w-full h-12 grid-cols-2">
    <TabsTrigger value="todo" className='h-full'>Todo</TabsTrigger>
  </TabsList>
  )
}
