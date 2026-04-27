import React from 'react'
import './Navbar.css'

const Topbar = () => {
    return (
        <>
            <div className="topbar-container">
                <h6><i className="fa-solid fa-phone-volume"></i> Emergency Call : 1234567890</h6>
                <h6><i className="fa-solid fa-clock"></i> 10:00 am TO 10:00pm</h6>
                <h6><i className="fa-solid fa-envelope"></i> help@abcd.com</h6>
                <h6><i className="fa-solid fa-caret-down"></i> English</h6>
            </div>
        </>
    )
}

export default Topbar