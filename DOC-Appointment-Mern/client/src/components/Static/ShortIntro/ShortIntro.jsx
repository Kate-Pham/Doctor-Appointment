import React from 'react'
import "./ShortIntro.css"
import ImageHos from '../../../assets/images/hospital/hos.jpg'

const ShortIntro = () => {
    return (
        <>
            <div className="intro-container">
                <div className='row'>
                    <div className="col-md-6 img-container">
                        <img src={ImageHos} alt="hosimage" className='hos-image' />
                    </div>
                    <div className="col-md-5 info-container">
                        <h1>Kate Pham</h1>
                        <h6>A Super Specility Hospital</h6>
                        {/* Type "lorem50", Enter */}
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque labore nemo ut tempore totam, aperiam iste esse et reiciendis minus libero atque ab, eligendi aut.</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque labore nemo ut tempore totam, aperiam iste esse et reiciendis minus libero atque ab, eligendi aut.</p>
                        <button className='btn btn-primary'>Book An Appointment Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShortIntro