<nav>
	<a href="/">overview</a>
</nav>

<script>
	import { onMount } from 'svelte';
	import data from "/src/data/dataset1.json"
  import p_int from "/src/data/dataset2.json"
  import data3 from "/src/data/dataset3.json"

	let name = 'Pavlos Dimadis';
	let university = 'KU Leuven';
	let number = 'r0877868';
	let currentDisp = 1;
	let selectedCarId = 2;
	let param1;
  let cars = [];

  onMount(() => {
    cars = data;
  });

onMount(() => {
  const searchParams = new URLSearchParams(window.location.search);
  selectedCarId = searchParams.get('param1');
});

selectedCarId = param1;

  let selectedDay = 6;
  let selectedMinute = 0;
  let maxMinutes = 1440; // Total minutes in a day
  let totalDays = 14; // Total number of days
  let maxCumulativeMinutes = totalDays * maxMinutes;

  let filteredData = [];

  onMount(() => {
    filterData();
  });

  function filterData() {
    filteredData = data.filter((item) =>
        item.day === selectedDay &&
        item.cumulative_minute_total <= selectedMinute
    );
  }

  function handleSliderChange(event) {
    selectedMinute = parseInt(event.target.value);
    filterData();
  }

	const mapWidth = 300;
  const mapHeight = 300;
  const latitudes = data.map(car => car.lat);
  const longitudes = data.map(car => car.long);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const latitudeRange = maxLatitude - minLatitude;
  const longitudeRange = maxLongitude - minLongitude;
  const LATITUDE_TO_PIXEL_RATIO = mapHeight / latitudeRange;
  const LONGITUDE_TO_PIXEL_RATIO = mapWidth / longitudeRange;


 let overviewData = [];

  onMount(() => {
    filterData2();
    generateOverviewImage();
  });

  function filterData2() {
    overviewData = data.filter((item) => item.car_id === selectedCarId);
  }

  function generateOverviewImage() {
    const canvas = document.getElementById('overview-canvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate bar width and height
    const barWidth = canvas.width / (maxCumulativeMinutes / 1440);
    const barHeight = canvas.height / data.length;

    // Draw the overview bars
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const x = item.cumulative_minute_total / (maxCumulativeMinutes / canvas.width);

      // Draw bar
      ctx.fillStyle = getLocationColor(item.location_type);
      ctx.fillRect(x, i * barHeight, barWidth, barHeight);

      // Draw day number
      ctx.fillStyle = 'black';
      ctx.fillText(item.day.toString(), x + 5, (i * barHeight) + 20);
    }

    // Draw vertical lines for time markers
    const timeMarkers = [0, 360, 720, 1080, 1440];
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.font = '10px sans-serif';
    ctx.textBaseline = 'top';
    for (const marker of timeMarkers) {
      const xPos = (marker / maxCumulativeMinutes) * canvas.width;
      ctx.beginPath();
      ctx.moveTo(xPos, 0);
      ctx.lineTo(xPos, canvas.height);
      ctx.stroke();

      const hour = Math.floor(marker / 60);
      const label = hour === 0 ? '24' : hour.toString();
      ctx.fillText(label, xPos - 5, canvas.height - 12);
    }
  }

  function getLocationColor(type) {
    switch(type) {
      case "professional":
        return "red";
      case "catering":
        return "green";
      case "domestic":
        return "orange";
      case "housing":
        return "purple";
      default:
        return "blue";
    }
  }

let groupedData = {};

data.forEach((locData) => {
  const day = locData.day;
  if (!groupedData[day]) {
    groupedData[day] = [];
  }
  groupedData[day].push(locData);
});

let groupedData2 = {};

Object.keys(groupedData).forEach((day) => {
  groupedData2[day] = {};

  groupedData[day].forEach((locData) => {
    const type = locData.type;
    if (!groupedData2[day][type]) {
      groupedData2[day][type] = [];
    }
    groupedData2[day][type].push(locData);
  });
});


 onMount(() => {
    Object.keys(groupedData).forEach((day) => {
      groupedData[day].forEach((location) => {
        overviewData.push({
          day,
          location,
        });
      });
    });
  });


   function handleSliderChange1(event) {
    selectedMinute = parseInt(event.target.value);
  }

  $: {
    const timeWindowInMinutes = 5;
  }
  
    function isWithinTimeWindow(car, selectedMinute) {
    const timeWindowInMinutes = 30;
    let lim = selectedMinute;
    let lowerBound = lim - timeWindowInMinutes;
    let upperBound = lim + timeWindowInMinutes;
    return car.cumulative_minute_total >= lowerBound && car.cumulative_minute_total <= upperBound;
  }

  // test

  //   function getAttributes(events, selectedCar) {
  //   const attributes = [];

  //   events.forEach((event) => {
  //   const { car, start, end, location } = event;
  //   if (car == selectedCar) {
  //     attributes.push({ car, start, end, location });
  //   }
  // });

  //   return attributes;
  // }




// const apiURL = "https://vda-lab.github.io/assets/vast2021_carstops.json";

// async function getSelelectedCarData() {
//   try {
//     const response = await fetch(apiURL);
//     const data = await response.json();

//     // Filter the data for cars with ID 1
//     const getSelelectedCarData = data.filter(car => car.car_id === 1);

//     // Print the filtered results
//     getSelelectedCarData.forEach(car => {
//       console.log(car);
//     });
//   } catch (error) {
//     console.error("Error occurred while accessing the API.", error);
//   }
// }

// getSelelectedCarData();

let currentIndex = selectedCarId;

   function goToPreviousCar() {
    if (selectedCarId > 0) {
      selectedCarId--;
    }
  }

  function goToNextCar() {
    {
      selectedCarId++;
    }
  }
 </script>

<style>
  .day-bar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .day-label {
    width: 40px;
    text-align: right;
    margin-right: 10px;
  }

  .bar {
    height: 20px;
    background-color: #007bff;
  }

  .bar.time-marker {
    position: absolute;
    width: 1px;
    height: 5%;
    background-color: #ccc;
  }

   .car_duration {
    position: absolute;
    width: 1px;
    height: 100%;
  }

   .overview {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .day-bar {
    display: flex;
    align-items: center;
    height: 20px;
    background-color: lightgray;
  }

  .day-number {
    margin-right: 10px;
  }

  .location-marker {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

.container {
  display: flex;
  align-items: flex-start;
}

.svg-container {
  margin-right: 10px; /* Adjust as needed */
}

.day-bars-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.day-bars-container {
  display: flex;
}

.day-bar {
  position: relative;
  margin-right: 10px;
}

.bar {
  position: relative;
  width: 100%;
}

.time-marker {
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #ccc;
}

.time-marker-label {
  position: absolute;
  bottom: -20px;
  font-size: 12px;
  text-align: center;
  width: 100%;
}

.time-marker-label:last-child {
  bottom: -140px;
}

/* test */
.professional {
  background-color: red;
}

/* Vertical Line Positions */
.time-marker:nth-child(1) { left: 0%; }
.time-marker:nth-child(2) { left: 25%; }
.time-marker:nth-child(3) { left: 50%; }
.time-marker:nth-child(4) { left: 75%; }
.time-marker:nth-child(5) { left: 100%; }

/* Time Labels Positions */
.time-marker-label:nth-child(1) { left: 0%; }
.time-marker-label:nth-child(2) { left: 25%; }
.time-marker-label:nth-child(3) { left: 50%; }
.time-marker-label:nth-child(4) { left: 75%; }
.time-marker-label:nth-child(5) { left: 100%; }

</style>

<main>

  <p><b>Details for car {selectedCarId}</p>
  <button on:click={() => goToPreviousCar()}>Previous</button>
  <button on:click={() => goToNextCar()}>Next</button>
  <ul>
		<li>Name: <b>{name}</b>  -  University: <b>{university}</b>  -  Number: <b>{number}</b></li>
	</ul>


	
	<div>
     <input type="range" min="0" max={maxCumulativeMinutes} step="1" bind:value={selectedMinute} on:input={handleSliderChange1} on:change={handleSliderChange1} />

  <p>Selected Minute: {selectedMinute}</p>
</div>

<div class="container">
<div class="svg-container">
  <svg width="300" height="300">
    <rect x="0" y="0" width="300" height="300" fill="#efefef" />
    {#each cars as car}
      {#if car.car_id == selectedCarId}
        {#if isWithinTimeWindow(car, selectedMinute)}
          <circle
            cx={(car.long - minLongitude) * LONGITUDE_TO_PIXEL_RATIO}
            cy={(maxLatitude - car.lat) * LATITUDE_TO_PIXEL_RATIO}
            r="5.2"
            fill="red"
            opacity="1"
          />
          {:else}
           <circle
            cx={(car.long - minLongitude) * LONGITUDE_TO_PIXEL_RATIO}
            cy={(maxLatitude - car.lat) * LATITUDE_TO_PIXEL_RATIO}
            r="5.2"
            fill="blue"
            opacity="0.2"
          />
        {/if}
      {/if}
    {/each}
  </svg>
</div>


<div class="day-bars-container" style="width: 300px; height: 300px;">
{#each Object.keys(groupedData) as day}
  <div class="day-bar">
    <div class="day-label">{day}</div>
    <div class="bar" style="width: 300px;">
    <div class="time-marker" style="left: 0%;"></div>
    <div class="car_duration professional" style="left: 10%;"></div>
    <div class="time-marker" style="left: 25%;"></div>
    <div class="time-marker" style="left: 50%;"></div>
    <div class="time-marker" style="left: 75%;"></div>
    <div class="time-marker" style="left: 100%;"></div>
     {#if day == Object.keys(groupedData)[Object.keys(groupedData).length - 1]}
      <div class="time-marker-label" style="left: -50%; bottom: -20px;">0</div>
      <div class="time-marker-label" style="left: -25%; bottom: -20px;">6</div>
      <div class="time-marker-label" style="left: 0%; bottom: -20px;">12</div>
      <div class="time-marker-label" style="left: 25%; bottom: -20px;">18</div>
      <div class="time-marker-label" style="left: 50%; bottom: -20px;">24</div>
    {/if}
      </div>
  </div>
{/each}
</div>
</div>

</main>