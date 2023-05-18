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
</script>


<main>
	<ul>
		<li>Name: <b>{name}</b></li>
		<li>University: <b>{university}</b></li>
		<li>Number: <b>{number}</b></li>
	</ul>

<p>This is the current value {selectedCarId}</p>
	
	<div>
  <input
    type="range"
    min="0"
    max={maxCumulativeMinutes}
    step="1"
    bind:value={selectedMinute}
    on:input={handleSliderChange}
  />

  <p>Selected Day: {selectedDay}</p>
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
</main>