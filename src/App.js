import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./App.css";
import { converteNrzi, convertePseudo, converte4B3T } from "./Algoritmos";

var seqEntrada = ("0100001011101001");

var seqNrzi = converteNrzi(seqEntrada);
seqNrzi.push(seqNrzi[seqNrzi.length - 1])
var seqPseudo = convertePseudo(seqEntrada);
seqPseudo.push(seqPseudo[seqPseudo.length - 1])
var seq4B3T = converte4B3T(seqEntrada);
seq4B3T.push(seq4B3T[seq4B3T.length - 1])

seqEntrada += " ";

const App = () => {
  const [categoryNzri, setCategoryNzri] = useState([]);
  const [dataNzri, setDataNzri] = useState([]);
  const [categoryPseudo, setCategoryPseudo] = useState([]);
  const [dataPseudo, setDataPseudo] = useState([]);
  const [category4B3T, setCategory4B3T] = useState([]);
  const [data4B3T, setData4B3T] = useState([]);

  useEffect(() => {
    const estadoNzri = [];
    const numBitsNzri = [];
    const estadoPseudo = [];
    const numBitsPseudo = [];
    const estado4B3T = [];
    const numBits4B3T = [];

    for (var i = 0; i < seqNrzi.length; i++) {
      estadoNzri.push(seqNrzi[i]);
      numBitsNzri.push(seqEntrada[i]);
    }

    for (var j = 0; j < seqPseudo.length; j++) {
      estadoPseudo.push(seqPseudo[j]);
      numBitsPseudo.push(seqEntrada[j]);
    }
    
    for (var h = 0; h < seq4B3T.length; h++) {
      estado4B3T.push(seq4B3T[h]);
      if (h == (seq4B3T.length - 1)) {
        numBits4B3T.push(" ")
      } else if (seq4B3T[h] == -1) {
        numBits4B3T.push("-")
      } else if (seq4B3T[h] == 1) {
        numBits4B3T.push("+")
      } else {
        numBits4B3T.push(seq4B3T[h]);
      }            
    }

    setCategoryNzri(numBitsNzri);
    setDataNzri(estadoNzri);
    setCategoryPseudo(numBitsPseudo);
    setDataPseudo(estadoPseudo);
    setCategory4B3T(numBits4B3T);
    setData4B3T(estado4B3T);
  });
  return (
    <>
      <div>
        <Chart
          options={{
            colors: ["#00bfff"],
            chart: {
              id: "Nrzi-example",
              toolbar: {
                show: false,
              },
              fontFamily: "Rubik",
            },
            markers: {
              size: 5,
              colors: "mediumpurple",
            },
            xaxis: {
              type: "category",
              categories: categoryNzri,
              labels: {
                offsetX: 10,
                offsetY: -5,
              },
              position: "top",
            },
            yaxis: {
              tickAmount: 1,
              labels: {
                style: {
                  colors: ["red", "green"],
                  fontSize: "16px",
                  fontWeight: 500,
                  cssClass: "apexcharts-yaxis-label",
                },
                formatter: function (value) {
                  if (value === 1) {
                    value = "+";
                    return value;
                  } else if (value === -1) {
                    value = "-";
                    return value;
                  } else {
                    value = "0";
                    return value;
                  }
                },
              },
            },
            grid: {
              xaxis: {
                lines: {
                    show: true
                }
              },
              yaxis: {
                lines: {
                    show: false
                }
              }, 
            },
            stroke: {
              curve: "stepline",
            },
            title: {
              text: "NRZI",
              align: "center",
              style: {
                fontSize:  "18px",
                fontWeight:  600,
                color:  "black",
              },
            },
          }}
          series={[
            {
              name: "series-1",
              data: dataNzri,
            },
          ]}
          type="line"
          width={1000}
          height={200}
        />

        <Chart
          options={{
            colors: ["#ff69b4"],
            chart: {
              id: "pseudo-example",
              toolbar: {
                show: false,
              },
              fontFamily: "Rubik",
            },
            markers: {
              size: 5,
              colors: "crimson",
            },
            xaxis: {
              type: "category",
              categories: categoryPseudo,
              labels: {
                offsetX: 10,
                offsetY: -5,
              },
              position: "top",
            },
            yaxis: {
              tickAmount: 2,
              labels: {
                style: {
                  colors: ["red", "black", "green"],
                  fontSize: "16px",
                  fontFamily: "Rubik",
                  fontWeight: 500,
                  cssClass: "apexcharts-yaxis-label",
                },
                formatter: function (value) {
                  if (value === 1) {
                    value = "+";
                    return value;
                  } else if (value === -1) {
                    value = "-";
                    return value;
                  } else {
                    value = "0";
                    return value;
                  }
                },
              },
            },
            grid: {
              xaxis: {
                lines: {
                    show: true
                }
              },
              yaxis: {
                lines: {
                    show: false
                }
              }, 
            },
            stroke: {
              curve: "stepline",
            },
            title: {
              text: "Pseudoternary",
              align: "center",
              style: {
                fontSize:  "18px",
                fontWeight:  600,
                color:  "black",
              },
            },
          }}
          series={[
            {
              name: "series-1",
              data: dataPseudo,
            },
          ]}
          type="line"
          width={1000}
          height={200}
        />

        <Chart
          options={{
            colors: ["#ff8c00"],
            chart: {
              id: "4B3T-example",
              toolbar: {
                show: false,
              },
              fontFamily: "Rubik",
            },
            markers: {
              size: 5,
              colors: "orangered",
            },
            xaxis: {
              type: "category",
              categories: category4B3T,
              labels: {
                offsetX: 13,
                offsetY: -5,
              },
              position: "top",
            },
            yaxis: {
              tickAmount: 2,
              labels: {
                style: {
                  colors: ["red", "black", "green"],
                  fontSize: "16px",
                  fontFamily: "Rubik",
                  fontWeight: 500,
                  cssClass: "apexcharts-yaxis-label",
                },
                formatter: function (value) {
                  if (value === 1) {
                    value = "+";
                    return value;
                  } else if (value === -1) {
                    value = "-";
                    return value;
                  } else {
                    value = "0";
                    return value;
                  }
                },
              },
            },
            grid: {
              xaxis: {
                lines: {
                    show: true
                }
              },
              yaxis: {
                lines: {
                    show: false
                }
              }, 
            },
            stroke: {
              curve: "stepline",
            },
            title: {
              text: "4B3T",
              align: "center",
              style: {
                fontSize:  "18px",
                fontWeight:  600,
                color:  "black",
              },
            },
          }}
          series={[
            {
              name: "series-1",
              data: data4B3T,
            },
          ]}
          type="line"
          width={1000}
          height={200}
        />
      </div>
    </>
  );
};
export default App;
