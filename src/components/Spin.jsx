import React from 'react'

const Spin = ({w}) => {
    return (
        <>
            <div className={`${w?"w-10":"w-6"} ${w?"h-10":"h-6"} border-4 border-t-background-secondary rounded-full animate-spin`}>
            </div>
        </>
    )
}

export default Spin