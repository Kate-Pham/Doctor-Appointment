import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DoctorData from './DoctorsData.json'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorDetails } from '../../redux/actions/doctorActions';
import { bookAppointment } from '../../redux/actions/authActions';
import { reset } from '../../redux/slice/authSlice';
import toast from 'react-hot-toast';

const Appointments = () => {
  const { id } = useParams()
  const [docInfo, setDocInfo] = useState(null)
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getDoctorDetails(id))
  }, [dispatch, id])

  const { doctor } = useSelector(state => state.doctor)

  useEffect(() => {
    if (doctor) {
      setDocInfo(doctor)
    }
  }, [doctor])

  // get date & time
  const extractDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, '0')
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const year = dateObj.getFullYear()
    return `${day}-${month}-${year}`
  }

  const extractTime = (ObjectTime) => {
    let hours = ObjectTime.getHours();
    const minutes = ObjectTime.getMinutes();
    const second = ObjectTime.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(second).padStart(2, '0')} ${ampm}`
  }

  const { user, success, error } = useSelector(state => state.auth)

  //handleBooking()

  const [actionTriggered, setActionTriggered] = useState(false) // ✅ same pattern as EditUserProfile

  const handleBooking = () => {
    if (!user?._id) {
      toast.error("Please login first")
      navigate('/login')
      return
    }

    const bookingData = {
      userId: user?._id,
      doctorId: id,
      amount: docInfo?.fees,
      slotDate: extractDate(selectedDateTime),
      slotTime: extractTime(selectedDateTime)
    }

    setActionTriggered(true)  // ✅ flag that user clicked Book Now
    dispatch(reset())
    dispatch(bookAppointment(bookingData))
  }

  // ✅ React AFTER async dispatch completes
  useEffect(() => {
    if (!actionTriggered) return  // ✅ ignore stale state on mount

    if (success) {
      toast.success("Booking Successful")
      dispatch(reset())
      setActionTriggered(false)
      navigate('/user/appointments')
    }
    if (error) {
      toast.error(error)
      dispatch(reset())
      setActionTriggered(false)
    }
  }, [success, error, actionTriggered])

  // const handleBooking = () => {
  //     const bookingData = {
  //       userId: user?._id,
  //       doctorId: id,
  //       amount: docInfo?.fees,
  //       slotDate: extractDate(selectedDateTime),
  //       slotTime: extractTime(selectedDateTime)
  //     };
  //     dispatch(bookAppointment(bookingData))
  //     dispatch(reset());
  //     if (success) {
  //       toast.success("Booking Successful");
  //       navigate('/user/appointments');
  //       dispatch(reset());
  //     }
  //     if (error) {
  //       toast.error(error);
  //       dispatch(reset());
  //       dispatch
  //     }
  //   }

  //   // useEffect(() => {
  //   //   if (success) {
  //   //     toast.success("Booking Successful");
  //   //     navigate('/user/appointments');
  //   //     dispatch(reset());
  //   //   }
  //   //   if (error) {
  //   //     toast.error(error);
  //   //     dispatch(reset());
  //   //     dispatch
  //   //   }
  //   // }, [dispatch, error, success, navigate])

  return (
    <>
      <div className="container docinfo-container">
        <div className="row m-3">
          <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
            <img src={`data:image/jpeg;base64,${docInfo?.image}`} alt="docImage" height={200} width={200} />
            <h6>{docInfo?.name}</h6>

            {/* dynamic class */}
            <h6 className={`${docInfo?.available ? "text-success" : "text-danger"}`}>
              {docInfo?.available ? "Available" : "Not Available"}
            </h6>
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center m=3">
            <h6>Experience: {docInfo?.experience} Years</h6>
            <h6>About Doctor: </h6>
            <p>{docInfo?.about}</p>
            <h5>Consultation Fee: {docInfo?.fees}</h5>

            {/* date time */}
            <div className="date-time mt-3">
              <h6 className=''>Select Your Booking Date & Time:👇</h6>
              <DatePicker
                className='calendar'
                minDate={new Date()}
                selected={selectedDateTime}
                onChange={date => setSelectedDateTime(date)}
                showTimeSelect
                timeFormat='h:mm aa'
                timeIntervals={30}
                dateFormat={'d-MMM-yyyy h:mm aa'}
                timeCaption='Time'
                minTime={new Date()}
                maxTime={setHours(setMinutes(new Date(), 2), 22)}
              />
              <p>Your Selected Booking:
                {selectedDateTime ? selectedDateTime.toLocaleString() : " Please select a Date & Time"}
              </p>
            </div>
            <button
              className='btn btn-primary w-50'
              onClick={handleBooking}
              disabled={!docInfo?.available}
            >
              {docInfo?.available ? "Book Now" : "Doctor Not Available"}

            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Appointments