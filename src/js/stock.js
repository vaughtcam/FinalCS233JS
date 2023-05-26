import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';
const xValues = ["Jan","Feb","March","April","May","Jun","Jul","Aug","Sep","Oct","Nov", "Dec"];
const yValues = [70,80,80,90,90,90,100,110,140,140,150,160];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      data: yValues
    }]
  },

  options: {
    responsive: true,

    datasets: {
        line:{
            backgroundColor:"rgba(0,0,0,.1)",
            borderColor: "rgba(255,166,0)",
        }
    },

    title: {
      display: true,
      text: 'Stock Chart',
      fontColor:"white"
    },


    tooltips: {
        mode: 'label',
       backgroundColor: 'black',
       
    },

    legend: {
        display: false,
    },

    hover: {
      mode: 'nearest',
      intersect: true
    },

    elements: {

        
        point: {
            pointStyle: "circle",
            borderColor: "black",
            hoverRadius: 8,
            hoverBackgroundColor:"white",
            hoverBorderColor: "white" ,
        },

        line: {
            borderWidth:3,
        }
    },

    scales: {
        responsive:true,
      xAxes: [{
        display: true,
        ticks: {
            fontColor: "white",
        },
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'Month',
          fontColor:"white"
        }
      }],
      yAxes: [{
        display: true,
        ticks:{
            fontColor:"white",
            beginAtZero:true
        },
        gridLines: {
          display: true,
          color: "rgba(0,0,0,.8"
        },
        scaleLabel: {
            display: true,
            labelString: 'Price',
            fontColor:"white"
          }
        }]
      }
    }
});