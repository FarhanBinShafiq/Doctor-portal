import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointments = ({ date }) => {
    const [services, setServices] = useState([])
    const [treatment,setTreatment]=useState(null)

    useEffect(() => {
        fetch('appointmentstime.json')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div>
            <h1 className='text-center text-primary'>Available Appointments on {format(date, 'PP')}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service => <Service service={service} setTreatment={setTreatment} key={service._id}></Service>)
                }
            </div>
            {
                treatment && <BookingModal treatment={treatment} date={date} setTreatment={setTreatment}/>
            }
        </div>
    );
};

export default AvailableAppointments;