import React from 'react'

const LocationMap = () => {
    return (
        <>
            {/* Google Map / right-click / Share this location / Embed a map */}
            <div className="location-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13192.353350627869!2d103.87917133123095!3d1.3534769743822481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssg!4v1774331283041!5m2!1sen!2ssg"
                    width={'100%'}
                    height={400}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>


        </>
    )
}

export default LocationMap