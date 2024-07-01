// Css
import './css/styles.css'

export default function Loading() {
    return <div className='w-full flex flex-col items-center justify-center'><div className="loaderData border border-gray-400 p-1 rounded-md"></div><p className='text-[13px]'>Carregando...</p></div>
}

