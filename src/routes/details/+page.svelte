<nav>
	<a href="/">overview</a>
</nav>

<script>
	import { onMount } from 'svelte';
	import data from "/src/data/dataset1.json"
  import p_int from "/src/data/dataset2.json"

	let name = 'Pavlos Dimadis';
	let university = 'KU Leuven';
	let number = 'r0877868';
	let currentDisp = 1;
	let selectedCarId = 2;
	let param1;

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

  function getLocationColor(locationType) {
    switch (locationType) {
      case 'professional':
        return 'blue';
      case 'housing':
        return 'green';
      // Add more location types and colors if needed
      default:
        return 'gray';
    }
  }
</script>

<style>
  canvas {
    width: 300px;
    height: 300px;
    border: 1px solid black;
  }
</style>

<main>
	<ul>
		<li>Name: <b>{name}</b>  -  University: <b>{university}</b>  -  Number: <b>{number}</b></li>
	</ul>

<p><b>Details for car {selectedCarId}</p>
	
	<div>
  <input
    type="range"
    min="0"
    max={maxCumulativeMinutes}
    step="1"
    bind:value={selectedMinute}
    on:input={handleSliderChange}
  />

  <!--<p>Selected Day: {selectedDay}</p>-->
  <p>Selected Minute: {selectedMinute}</p>
</div>

<svg width=300 height=300>
  <rect x="0" y="0" width="300" height="300" fill="#efefef" />
  {#each data as car}
	{#if car.car_id == selectedCarId}
    <circle
      cx={(car.long - minLongitude) * LONGITUDE_TO_PIXEL_RATIO}
      cy={(maxLatitude - car.lat) * LATITUDE_TO_PIXEL_RATIO}
      r={car.car_id == selectedCarId ? "5.2" : "1.2"}
      opacity={car.car_id == selectedCarId ? "5.2" : "1.2"}
      fill="blue"
    />
	{/if}
  {/each}
	</svg>

<div>
  <canvas id="overview-canvas"></canvas>
</div>
</main>