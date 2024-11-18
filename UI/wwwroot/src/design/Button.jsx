
function Button({ text,className,type,disabled,...rest}) {
  return (
    <button className={`bg-black text-white px-6 py-4 w-fit font-bold uppercase hover:bg-slate-800 ${className}`} disabled={disabled} type={type} {...rest}>{text}</button>
  )
}

export default Button
