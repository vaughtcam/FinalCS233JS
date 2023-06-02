import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';


class Stock {
  constructor() {
    this.uiForm = document.querySelector("#zipForm");
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.uiForm.addEventListener("submit", this.onFormSubmit);
    this.chart = null;
    this.createChart = this.createChart.bind(this);
    this.inputSymbol = document.getElementById("stock");
    this.uiSymbol = document.getElementById("ticker");
    this.ui100dayHigh = document.getElementById('6monthHigh');
    this.ui100dayLow = document.getElementById("6monthLow");
    this.uicurrentPrice = document.getElementById("currentPrice");
    this.uiName = document.getElementById('name');
    this.uiDescription = document.getElementById('description');
    this.uiDayLow = document.getElementById('low');
    this.uiDayHigh = document.getElementById('high');
    this.uiDate = document.getElementById("date");
    
  }

  createChart(xValues, yValues) {
    if (this.chart != null)
      this.chart.destroy();

    this.chart = new Chart(
      "myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          data: yValues
        }]
      },


      options: {
        plugins: {
          legend: {
            display: false,
          },

          title: {
            display: true,
            text: this.symbol + " 100 Day Closing Values",
            color: "white",
            font: {
              size: 35
            }
          },

          tooltip: {
            titleFont: {
              size: 80,
            },

            titleColor: "orange",

            bodyFont: {
              size: 50,
            },

            bodyColor: "orange",

            displayColors: true,
          
          }
        },
        responsive: true,

        datasets: {
          line: {
            backgroundColor: "rgba(0,0,0,.1)",
            borderColor: "rgba(255,166,0)",
          }
        },

        hover: {
          mode: 'nearest',
          intersect: true
        },

        elements: {


          point: {
            radius: 10,
            backgroundColor: "white",
            pointStyle: "rectRounded",
            borderColor: "black",
            hoverRadius: 12,
            hoverBackgroundColor: "white",
            hoverBorderColor: "white",
          },

          line: {
            borderWidth: 3,
          }
        },

        scales: {
         
          x: {
            display: true,
            ticks: {
              color: "white",
            },
            gridLines: {
              display: false
            },
            title: {
              display: true,
              labelString: 'Month',
              color: "white",
              size: 20

            }
          },
          y: {
            display: true,
            ticks: {
              color: "white"
            },
            gridLines: {
              display: true,
              color: "rgba(0,0,0,.8)"
            },
            scaleLabel: {
              display: true,
              labelString: 'Price',
              fontColor: "white"
            }
          }
        },

      }
    });



  }

  onFormSubmit(event) {
    event.preventDefault();
    this.symbol = this.inputSymbol.value

    console.log(this.symbol);
    this.date = new Date;
    this.date = this.date.toISOString()
    console.log(this.date);
    this.dateSliced = this.date.slice(0, 10);
    this.endNumber = Number(this.date.slice(9, 10));
    console.log(this.endNumber);

    if (Number(this.date.slice(9, 10)) > 0 && Number(this.date.slice(9, 10)) <= 9) {
      this.yesterdayEndNumber = this.endNumber - 1;
      this.stringYesterdayEndNumber = this.yesterdayEndNumber.toString();
      this.yesterday = this.dateSliced.slice(0, 9) + this.stringYesterdayEndNumber;
      console.log(this.yesterday);
    }

    else if ((Number(this.date.slice(8, 10)) == "00")) {

    }


    else {
      this.yesterdayEndNumber = this.endNumber + 1;
      this.stringYesterdayEndNumber = this.yesterdayEndNumber.toString();
      this.yesterday = this.dateSliced.slice(0, 9) + this.stringYesterdayEndNumber;
      console.log(this.yesterday);
    }

    this.yesterday = this.dateSliced.slice(0, 9) + "0"
    console.log(this.dateSliced);
    console.log(this.yesterday);


    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.symbol}&apikey=6M7IFRY4VN7E7BVD`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.dateArray = Object.keys(data["Time Series (Daily)"]);
        this.symbol = data["Meta Data"]["2. Symbol"];
        this.dayHigh = data["Time Series (Daily)"][this.dateArray[0]]['2. high'];
        this.dayLow = data["Time Series (Daily)"][this.dateArray[0]]['3. low'];
        this.dayCurrentPrice = data["Time Series (Daily)"][this.dateArray[0]]['4. close'];
        this.a = Object.values(data["Time Series (Daily)"])
        let SortedLowHighArray = [];
        let closingValueArray = [];

        
        


        

        for (let i = 0; i < this.a.length; i++) {
          let b = this.a[i];
          SortedLowHighArray.push(b["2. high"]);
        }

        SortedLowHighArray.sort(function (a, b) { return a - b });
        this.hundredDayHigh = SortedLowHighArray[99];
        this.hundredDayLow = SortedLowHighArray[0];


        for (let i = 0; i < this.a.length; i++) {
          let d = this.a[i];
          closingValueArray.push(d["4. close"]);
        }

        this.uiSymbol.innerHTML = this.symbol;
        this.ui100dayHigh.innerHTML = this.hundredDayHigh;
        this.ui100dayLow.innerHTML = this.hundredDayLow;
        this.uicurrentPrice.innerHTML = this.dayCurrentPrice;
        this.uiDayLow.innerHTML = this.dayLow;
        this.uiDayHigh.innerHTML = this.dayHigh;
        this.uiDate.innerHTML = this.dateArray[0];
        
        this.dateArray.reverse();
        closingValueArray.reverse();
       

        this.createChart(this.dateArray, closingValueArray);
      })
      .catch(error => {
        alert('There was a problem getting stock information!')
      });


    fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${this.symbol}&apikey=6M7IFRY4VN7E7BVD`)
      .then(response => response.json())
      .then(data => {
        this.name = data.Name;
        this.description = data.Description;

        this.uiName.innerHTML = this.name;
        this.uiDescription.innerHTML = this.description;
        
        //console.log(this.description);
        //console.log(this.name);
        //console.log(data)
      })



      .catch(error => {
        alert('There was a problem getting company information!')
      });

  }






}






/*const xValues = ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const yValues = [70, 80, 80, 90, 90, 90, 100, 110, 140, 140, 150, 160];

let chart = new Chart("myChart", {
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
      line: {
        backgroundColor: "rgba(0,0,0,.1)",
        borderColor: "rgba(255,166,0)",
      }
    },

    title: {
      display: true,
      text: 'Stock Chart',
      fontColor: "white"
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
        radius: 10,
        pointStyle: "rectRounded",
        borderColor: "black",
        hoverRadius: 12,
        hoverBackgroundColor: "white",
        hoverBorderColor: "white",
      },

      line: {
        borderWidth: 3,
      }
    },

    scales: {
      responsive: true,
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
          fontColor: "white"
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          fontColor: "white",
          beginAtZero: true
        },
        gridLines: {
          display: true,
          color: "rgba(0,0,0,.8"
        },
        scaleLabel: {
          display: true,
          labelString: 'Price',
          fontColor: "white"
        }
      }]
    }
  }
});


*/

window.onload = () => { new Stock() };