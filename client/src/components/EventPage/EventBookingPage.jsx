import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventBookingPage.css';


const EventBookingPage = () => {
  const { name } = useParams();

  const [venue, setVenue] = useState();

  const [fanPitCount, setFanPitCounter] = useState(0);
  const [vipCount, setVipCounter] = useState(0);
  const [generalAccessCount, setGeneralAccessCounter] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketTypeBought, setTicketTypeBought] = useState('');

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/booking/getEventVenue/${name}`,
          { headers: { authorization: `Bearer ${accessToken}` } }
        );
        const data = response.data;
        if (response.status === 200) {
          setVenue(data.venue);
        } else {
          console.error('Failed to fetch movies:', data.message);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };
    fetchVenue();
  }, [name]);

  const handleAddTicket = (ticketName, price, operator) => {
    const updatedFanPitCount =
      ticketName === 'Fan Pit' ? fanPitCount + operator : 0;
    const updatedVipCount = ticketName === 'VIP' ? vipCount + operator : 0;
    const updatedGeneralAccessCount =
      ticketName === 'General Access' ? generalAccessCount + operator : 0;

    const clampedFanPitCount = Math.max(0, Math.min(updatedFanPitCount, 10));
    const clampedVipCount = Math.max(0, Math.min(updatedVipCount, 10));
    const clampedGeneralAccessCount = Math.max(
      0,
      Math.min(updatedGeneralAccessCount, 10)
    );

    setFanPitCounter(clampedFanPitCount);
    setVipCounter(clampedVipCount);
    setGeneralAccessCounter(clampedGeneralAccessCount);

    const totalTickets = Math.max(
      clampedFanPitCount,
      clampedVipCount,
      clampedGeneralAccessCount
    );
    setTicketTypeBought(ticketName);
    setTotalTickets(totalTickets);
    setTotalAmount(totalTickets * price);
  };

  const handlePayment = async () => {
    try {
      const {
        data: { data },
      } = await axios.post(`${process.env.REACT_APP_API_URL}/payment/orders`, {
        amount: totalAmount,
      });

      const options = {
        key: 'rzp_test_GYgzG2QqvkqDCa', // Enter the Key ID generated from the Dashboard
        amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: data.currency,
        name: ticketTypeBought,
        description: 'Transaction',
        order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: 'http://localhost:3001/payment/verifyPayment',
        notes: {
          address: 'EventHassle Corporate Office',
        },
        theme: {
          color: '#1f1f1f',
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="booking-container">
      <h1>{venue?.venueName}</h1>
      <p>{venue?.venueLocation}</p>
      <h2>SELECT YOUR CATEGORY</h2>
      {venue?.ticketTypes.map((ticketType) => (
        <div key={ticketType._id} className="ticket">
          <div>
            <h2>{ticketType.ticketName}</h2>
            <p>₹ {ticketType.price}</p>
          </div>
          <div className="counter">
            <button
              onClick={() =>
                handleAddTicket(ticketType.ticketName, ticketType.price, +1)
              }
            >
              +
            </button>

            <span>
              {ticketType.ticketName === 'Fan Pit'
                ? fanPitCount
                : ticketType.ticketName === 'VIP'
                ? vipCount
                : generalAccessCount}
            </span>
            <button
              onClick={(e) =>
                handleAddTicket(ticketType.ticketName, ticketType.price, -1)
              }
            >
              -
            </button>
          </div>
        </div>
      ))}
      <div class="proceed-container">
        {totalAmount > 0 && <div>{totalAmount}</div>}
        {totalTickets > 0 && <div>{totalTickets} Ticket</div>}
        <button
          className={`proceed-btn  ${
            totalTickets > 0 ? `proceed-btn-custom-style ` : ``
          } `}
          onClick={handlePayment}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default EventBookingPage;
