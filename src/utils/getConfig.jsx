

const getConfig = () => ({
  headers: { authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
 }
});

export default getConfig;