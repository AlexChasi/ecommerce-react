export function LoginInput ({ name, id, type, text, placeholder, required = true }) {
  return <div className="flex flex-col">
    <label htmlFor={id}>{text}</label>
    <input type={type} name={name} required={required} id={id} className="py-1 text-lg outline-none px-4 border border-neutral-300" placeholder={placeholder} />
  </div>
}
