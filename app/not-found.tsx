import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className=' fixed top-0 left-0 right-0 bottom-0 bg-background z-50 flex items-center justify-center flex-col'>
      <h2 className=' text-3xl font-bold'>Not Found</h2>
      <p className=' text-muted-foreground'>Could not find requested resource</p>
      <Link className=' text-foreground/40 font-extrabold' href="/">Return Home</Link>
    </div>
  )
}