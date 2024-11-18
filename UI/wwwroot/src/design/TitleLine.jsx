function TitleLine({ title }) {
  return (
    <div className="px-[4%]">
        <h1 className="text-xl font-medium text-uppercase">{title}</h1>
        <div>
            <div className="w-full h-[1.5px] bg-blue-700" />
        </div>
    </div>
  )
}

export default TitleLine
