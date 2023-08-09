import { Link } from 'react-router-dom'

export function Linking ({ pageName }) {
  return <div className="flex gap-x-4 items-center">
    <Link to='/'>Home</Link>
    <div id='circle' className="bg-red-400 rounded-full h-[6px] w-[6px]" />
    <strong>{pageName}</strong>
  </div>
}
