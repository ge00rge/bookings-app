/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51JrnDoBgQWuaBm9DHuBKX11D0Q0WQHphMAIYbrXkoblELjDnujEzUpyac6WIcV9hN4yfYfnJDtSjj3jXYWFVhD2600uVLyZxBy'
  );
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
