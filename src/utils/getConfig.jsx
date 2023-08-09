

const getConfig = () => ({
  headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
});

export default getConfig;