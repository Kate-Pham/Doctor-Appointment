import React from 'react'
import './WhyChoose.css'
import Image1 from '../../../assets/images/hospital/personalize.png'
import Image2 from '../../../assets/images/hospital/trust.png'
import Image3 from '../../../assets/images/hospital/empower.png'
const WhyChoose = () => {
    return (
        <>
            <h1 className='text-center mt-5'>Why Choose Us?</h1>
            <div className="row why-container">
                <div className="col-md-3">
                    <img src={Image1} alt="image1" width={'150px'} />
                    <h2>Personalize Excellence</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi hic nesciunt, praesentium totam fuga repudiandae natus dignissimos facilis dolores atque impedit doloremque reprehenderit laborum fugiat a adipisci, asperiores incidunt itaque expedita iure ex? Nam dolor nobis facere voluptatum harum quia omnis recusandae, voluptas voluptatem vitae temporibus unde numquam iure modi.</p>
                </div>
                <div className="col-md-3">
                    <img src={Image2} alt="image1" width={'150px'} />
                    <h2>Trusted Care</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi hic nesciunt, praesentium totam fuga repudiandae natus dignissimos facilis dolores atque impedit doloremque reprehenderit laborum fugiat a adipisci, asperiores incidunt itaque expedita iure ex? Nam dolor nobis facere voluptatum harum quia omnis recusandae, voluptas voluptatem vitae temporibus unde numquam iure modi.</p>
                </div>
                <div className="col-md-3">
                    <img src={Image3} alt="image1" width={'150px'} />
                    <h2>Empowering Wellness Journey</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi hic nesciunt, praesentium totam fuga repudiandae natus dignissimos facilis dolores atque impedit doloremque reprehenderit laborum fugiat a adipisci, asperiores incidunt itaque expedita iure ex? Nam dolor nobis facere voluptatum harum quia omnis recusandae, voluptas voluptatem vitae temporibus unde numquam iure modi.</p>
                </div>
            </div>
        </>
    )
}

export default WhyChoose