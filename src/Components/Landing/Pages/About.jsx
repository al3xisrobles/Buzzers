import EventCreation from '../../../Assets/Landing/About/EventCreation.svg'

function About() {
  return (
    <div className='bg-salt w-screen h-screen'>
      <div className='w-full text-center h-[75%] flex flex-col gap-4 justify-center items-center'>
        <h1 className='text-6xl font-bold'>Here&apos;s how it works</h1>
        <h3 className='text-2xl'>Take your organization to the next level: <span className='bg-gradient-to-r from-[#FFD54F] to-[#E5B200] text-transparent bg-clip-text opacity-75'>get sponsored and get paid.</span></h3>
      </div>

      <div className='w-full h-[20rem] flex flex-row justify-evenly bg-haze py-10'>
        <div className='my-auto flex items-center'>
          <h4 className='text-4xl font-semibold'>Post events in 2 minutes</h4>
        </div>
        <div className='my-auto'>
          <img src={EventCreation} alt="Event creation" className="h-[25rem]" />
        </div>
      </div>
    </div>
  )
}

export default About
