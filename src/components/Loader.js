import React from 'react'
import { RevolvingDot } from 'react-loader-spinner'

function Loader() {
    return (
        <>
        <div className=' mx-auto mt-20'>

            <div>
            <RevolvingDot
                height="300"
                width="200"
                radius="30"
                color="#4fa94d"
                secondaryColor=''
                ariaLabel="revolving-dot-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            </div>
            </div>

        </>
    )
}

export default Loader
