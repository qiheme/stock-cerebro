import axios from 'axios';

export const searchNews = () => {
  // TODO: Handle 429s from Finnhub
  return axios.get('/api/finnhub/general');
};

// const searchStock = () => {
//   const symbol = document.getElementById("stock-input").value;
//   axios.get(`/api/finnhub/quote/${symbol}`).then((response) => {
//     console.log(response);
//     response.data.symbol = symbol;
//     setSearchedStock(response.data);
//     setModalShow(true);
//   });
// };

// const searchCompanyInfo = () => {
//   const symbol = document.getElementById("stock-input").value;
//   axios
//     .get(`/api/finnhub/news/${symbol}`)
//     .then((response) => {
//       console.log(response);
//       response.data.symbol = symbol;
//       setSearchedStock(response.data);
//       setModalShow(true);
//     });
// };
