/* eslint-disable */
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js/pure';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51KBXHtKKRdGCO8aSassOqCM6Tw0x3xwFqlOD4KEC1dwyhfIzKkbXD5jzkK8U87RwZi22T4Wpjt9kMSbPYZZGtEB000VMPpdKDM'
);

export const bookTour = async (tourId, e) => {
  try {
    // const stripe = await loadStripe(
    //   'pk_test_51KBXHtKKRdGCO8aSassOqCM6Tw0x3xwFqlOD4KEC1dwyhfIzKkbXD5jzkK8U87RwZi22T4Wpjt9kMSbPYZZGtEB000VMPpdKDM'
    // );
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    e.target.textContent = 'Book tour now!';
  } catch (err) {
    console.log(err);
    showAlert('error', err);
    e.target.textContent = 'Book tour now!';
  }
};
