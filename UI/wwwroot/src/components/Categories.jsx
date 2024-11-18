
import IconCategory from './IconCategory';
import face from '../assets/face.png';
import TitleSection from '../design/TitleSection';
function Categories() {
    
    return (
        <div>
            <TitleSection text="SHOP OUR POPULAR CATEGORIES"/>
            <div className="flex gap-28 justify-center items-center my-10">
                <IconCategory text="face" catImg={face} />
                <IconCategory text="face" catImg={face} />
                <IconCategory text="face" catImg={face} />
                <IconCategory text="face" catImg={face} />
                <IconCategory text="face" catImg={face} />
                <IconCategory text="face" catImg={face} />
                <IconCategory text="face" catImg={face} />
                <IconCategory text="face" catImg={face} />
            </div>
        </div>
    )
}

export default Categories
