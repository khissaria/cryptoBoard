import { chartColors } from "./components/colors";

export const formatData = (data) => {

  let finalData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: chartColors,
        borderColor: chartColors,
        fill: false
      }
    ]
  };


  data.forEach((coinData) => {
    if (coinData.totalQuantity !== 0) {
      finalData.labels.push(coinData.coinID);
      finalData.datasets[0].data.push(coinData.totalValue);
    }

  });



  return finalData;
};