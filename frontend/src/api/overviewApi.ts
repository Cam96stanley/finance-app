import api from './api';

export const overviewTotals = async () => {
  try {
    const token = localStorage.getItem('token');

    console.log(token);

    if (!token) throw new Error('No token found');

    const res = await api.get('/budget/get-totals', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    if (res.data === '') {
      return { balance: 0, income: 0, expenses: 0 };
    }
    return res.data;
  } catch (error) {
    console.error(error);
    return { balance: 0, income: 0, expenses: 0 };
  }
};
