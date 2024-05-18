import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className='sm:py-24'>
      <div className='sm:container sm:flex sm:items-center sm:justify-center'>
        <SignUp />
      </div>
    </section>
  )
}
