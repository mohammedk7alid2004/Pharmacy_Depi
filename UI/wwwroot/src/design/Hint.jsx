import { Link } from "react-router-dom";
function Hint({text, link,name}) {
  return (
    <div>
      <p className="text-sm text-gray-500 font-normal text-center my-2">{text} <Link to={link} className="text-blue-500 font-normal">{name}</Link></p>
    </div>
  )
}

export default Hint
