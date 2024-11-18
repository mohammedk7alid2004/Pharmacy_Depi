import { DNA } from 'react-loader-spinner'; 

const Loader = ({ visible }) => {
    return (
        <div className={`flex items-center justify-center h-screen ${visible ? '' : 'hidden'}`}>
            <DNA
                visible={visible}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    );
};

export default Loader;