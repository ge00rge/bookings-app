/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';
export const login = async (email, password) => {
  console.log(email, password);

  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: { email: email, password: password },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'logged in successfuly!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    console.log('login code reached!!');
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if ((res.data.status = 'success')) {
      location.reload();
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Error logging out! Try again');
  }
};
