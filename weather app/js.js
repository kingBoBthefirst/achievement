
let fc_content = document.querySelector('.forecast-content');

var fc_location = fc_content.querySelector('.location');
var degree = fc_content.querySelector('.degree');
var num = degree.querySelector('.num');
var fc_icon = degree.querySelector('forecast-icon');
var today1 = document.querySelector('.today');
var apikey = '3da325860116450c825185304241710';
var forcast_main = document.querySelector('.forecast-table');
var search=document.getElementById("search");
var third_day;
const today = new Date();


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayOfWeek = days[today.getDay()];
const day = today.getDate();
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const month = months[today.getMonth()];


const year = today.getFullYear();

const formattedDate = `${dayOfWeek} (${day}/${month}/${year})`;


async function getweather(text){
  var  response1= await fetch( `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${text}`);
  var  response2= await fetch( `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${text}&days=3`);
  var data1 = await response1.json();
  var data2 = await response2.json();
  console.log(data2);
  display(data1,data2);
}
search.addEventListener('keyup',function(){
getweather(search.value);
console.log(search.value);
});

function display(data1,data2){
var first_day= today.getDay()+1;
var second_day =first_day+1;
  if(today.getDay()+1 >= 6){
    third_day = 0;
  }
  else{
    third_day=today.getDay()+1;
  }
  forcast_main.innerHTML=`
        <div class="container">
        <div class="forecast-container" id="forecast">
        <div class="today forecast">
                <div class="forecast-header" id="today">
                <div class="day">${dayOfWeek}</div>
                <div class="date">${day}${month}</div>
                </div> 
                <div class="forecast-content" id="current">
                <div class="location">${data1.location.region}</div>
                <div class="degree">
                <div class="num">${data1.current.temp_c}<sup>o</sup>C</div>  
                <div class="forecast-icon">
                    <img src="${data1.current.condition.icon}"></div>	    
                </div>
                <div class="custom2">${data1.current.condition.text}</div>
                            <span><img src="images/icon-umberella.png" alt="">20%</span>
                            <span><img src="images/icon-wind.png" alt="">${data1.current.wind_kph}km/h</span>
                            <span><img src="images/icon-compass.png" alt="">${data1.current.wind_dir}</span>
                </div>
            </div>	
            <div class="forecast">
            <div class="forecast-header">
                <div class="day">${days[today.getDay()+1]}</div>
            </div> 
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src=${data2.forecast.forecastday[1].day.condition.icon} alt="" width="48">
                </div>
                <div class="degree">${data2.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup>C</div>
                <small>${data2.forecast.forecastday[1].day.avgtemp_f}21.5<sup>o</sup></small>
                <div class="custom2">${data2.forecast.forecastday[1].day.condition.text}</div>
            </div>
            </div>
            <div class="forecast">
            <div class="forecast-header">
                <div class="day">${days[third_day]}</div>
            </div> 
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src=${data2.forecast.forecastday[2].day.condition.icon} alt="" width="48">
                </div>
                <div class="degree">${data2.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup>C</div>
                <small>${data2.forecast.forecastday[2].day.avgtemp_f}<sup>o</sup></small>
                <div class="custom2">${data2.forecast.forecastday[2].day.condition.text}</div>
            </div>
            </div>
          </div>
            </div>
      `;
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelector('.nav-link.active')?.classList.remove('active');
      this.classList.add('active');
    });
  });


