const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  
  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div id=${i} class="today">${i}</div>`;
    } else {

      days += `<div id="${i}">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let days = document.getElementById('days');
//let next = document.getElementById('next');
let map = new Map();


today =  new Date().getDate();
let prevday; 
let chartday =  new Date().getDate();

let labels2 = ['DAY 1','DAY 2','DAY 3','DAY 4','DAY 5','DAY 6','DAY 7'];
let data2 = [];
let colors2 = ['#fbe8a6', '#d2fdff', '#f4976c', '#303c6c','#b4dfe5','#36CAAB','#34495E','#34495E','#34495E'];
let countdays = 0;
let savechart=false;

function printID(e)
{

    
    

    e = e || window.event;
    e = e.target || e.srcElement;
    let days_left = days.value;
    let goals = String(inputField.value);
    
    
    if (e.id == "addToDo")
    {
        if (inputField.value != "" && !map.has(goals) )
        {
            map.set(goals,days_left);
            var div = document.createElement('div');
            div.setAttribute("id", goals);
            div.classList.add('paragraph-styling');
            div.innerHTML = `<input type="checkbox" class = "cb" id="cb-${goals}"> Goal: ${goals} | Days Left: ${days_left}`;
            toDoContainer.appendChild(div);
            inputField.value = "";
        } 
    }

    
    if (e.id == "next")
    {
        savechart=false;
        if (today == new Date().getDate()){
            today++;
            here = document.getElementById(new Date().getDate())
            here.classList.remove("today");
        }
        
        
        var val = "";
        var index;
        
        if(prevday)
        {
          prevday.classList.remove("today");
        }
       
        
        let addtoday = document.getElementById(today);
        today++;
        chartday++;
        
        
        if (addtoday)
        {
          addtoday.setAttribute("class","today");
        }
        
        for (let [key, value] of  map.entries()) 
        {   
            index = document.getElementById(String(key));
            if (value !=0)
            {
                val = value-1;
                map.set(key,val);
                index.innerHTML = `<input type="checkbox" class = "cb" id="cb-${goals}">Goal: ${key} | Days Left: ${value-1}`;
            }
            if (value == 0)
            {
                alert("Goal Completed!");
                map.delete(key);
                index.remove();
            }  
            
        }
       
        prevday=addtoday;
      
        
   
     }

      let allGoals =  Array.from(map.keys());
        let items = [];
        let save=[];
        let arrval=[];
        
        let count = 0;
        //console.log(allGoals[0]); 
        if (e.id == "save")
        {
           var slides = document.getElementsByClassName("cb");
           for (var i = 0; i < slides.length; i++) 
           {
             if(slides.item(i).checked){
                count++;
             }
            
             //arrval.push(slides.item(i).checked);     
           }
           //localStorage.setItem(chartday, arrval);

          
          

          localStorage.setItem(chartday, (count/slides.length)*100);
          
          let objects = localStorage.getItem(chartday);
          //labels2.push(chartday)
          if (!savechart){
            data2.push(objects);
            savechart=true;
          }
          else{
            data2.pop();
            data2.push(objects);
           
          }
          
          if (countdays == 7){
            countdays=0;
            data2=[];
          }
          else{
            countdays++;
          }
          
          

     
          //console.log(objects);
           
          
          let myChart2 = document.getElementById("myChart2").getContext('2d');
          
          let chart2 = new Chart(myChart2, {
              type: 'bar',
              data: {
                  labels: labels2,
                  datasets: [ {
                      data: data2,
                      backgroundColor: colors2
                  }]
              },
              options: {
                  title: {
                      text: "Weakly Progress",
                      display: true
                  },
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                        ticks: {
                            
                            suggestedMin: 0,
                            suggestedMax: 100
                        },
                        scaleLabel: {
                          display: true,
                          labelString: 'Percent Completed'
                        }
                    }],
                    xAxes: [{
                      scaleLabel: {
                        display: true,
                        labelString: 'Days of the Week'}
                    }]
                }

              }
          });

          

        }
     
}



