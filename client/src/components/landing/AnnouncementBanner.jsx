import React from 'react'

const AnnouncementBanner = () => {
    return (
        <>
            <div className="relative  w-full bg-[#8B0000] text-white py-4 text-center font-bold text-lg mt-4 overflow-hidden">

                {/* Announcement Text */}
                <div className="leading-tight">
                    <div>INDIA: Ease of Doing Business 2017 rank: 100</div>
                    <div>Ease of Doing Business 2016 rank: 130</div>
                </div>

                {/* NEW Ribbon */}
                <div className="absolute top-0 right-0 mt-5">
                    <div className="new-ribbon">NEW</div>
                </div>
            </div>
        </>
    )
} 

export default AnnouncementBanner
