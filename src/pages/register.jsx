import { LoginInput } from '../components/common/login-input'

const inputs = [
  { type: 'email', text: 'Email', placeholder: '', name: 'email', id: 'email' },
  { type: 'password', text: 'Password', placeholder: '', name: 'password', id: 'password' },
  { type: 'text', text: 'First Name', placeholder: '', name: 'firstName', id: 'firstName' },
  { type: 'text', text: 'Last Name', placeholder: '', name: 'lastName', id: 'lastName' },
  { type: 'number', text: 'Phone', placeholder: '', name: 'phone', id: 'phone' }
]

export function Register () {
  return <main className="bg-neutral-100 flex justify-center items-center py-8">

    <form className="bg-white flex flex-col rounded-lg p-5 py-7 max-w-[400px] overflow-hidden w-full text-neutral-800 relative">
      <h1 className='text-2xl mb-7 font-normal text-neutral-600'>Sign Up</h1>

      <div className='flex flex-col gap-y-4'>
        {
          inputs.map(el => <LoginInput key={el.id} {...el} />)
        }
        <button type='submit' disabled={true} className='bg-rose-500 text-white py-2 mt-2'>Register</button>
      </div>

    </form>
  </main>
}
