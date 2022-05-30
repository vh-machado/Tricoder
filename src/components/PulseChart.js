import Chart from "react-apexcharts";

export default function PulseChart(props) {
  return (
    <Chart
      options={{
        colors: [props.strokeColor],
        chart: {
          id: props.idChart,
          toolbar: {
            show: false,
          },
          fontFamily: "Rubik",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "category",
          categories: props.categoryX,
          labels: {
            style: {
              colors: "#4E3B9D",
              fontSize: "12px",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
            offsetX: props.offsetXLabels,
            offsetY: -5,
          },
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          tickAmount: props.tickAmountY,
          labels: {
            style: {
              colors: props.colorsYLabels,
              fontSize: "14px",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
            offsetX: -5,
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
          strokeDashArray: 4.5,
          borderColor: "#4E3B9D",
          padding: {
            top: 10,
          },
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        stroke: {
          curve: "stepline",
          lineCap: "round",
          width: 3,
        },
        title: {
          text: props.titleChart,
          align: "left",
          style: {
            fontSize: "18px",
            fontWeight: 400,
            color: "#4E3B9D",
          },
        },
      }}
      series={[
        {
          name: "series-1",
          data: props.dataChart,
        },
      ]}
      type="line"
      width={800}
      height={160}
    />
  );
}
