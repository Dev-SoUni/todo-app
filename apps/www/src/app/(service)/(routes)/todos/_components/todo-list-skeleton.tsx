import { Skeleton } from "@/components/ui/skeleton"

export function TodoListSkeleton(){
  return (
    <>
      {
        Array.from({length: 6}).map((_, idx) => (
          <div key={idx} className={"relative m-4 px-4 py-4 flex gap-4 border-b border-gray-200"}>
            <div className="pt-0.5">
              <Skeleton className="rounded-full border border-gray-300 w-5 h-5"/>
            </div>
            <div className="flex flex-col gap-0.5">
              <Skeleton className="w-[150px] h-[24px]"/>
              <Skeleton className="w-[250px] h-[16px]"/>
              <div className="mt-1 text-sm flex">
                <Skeleton className="w-[100px] h-[24px]"/>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}
