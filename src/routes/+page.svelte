<!-- App.svelte -->
<script>

//Section1

  let name = 'Pavlos Dimadis';
	let university = 'KU Leuven';
	let number = 'r0877868';
  import { onMount } from 'svelte';
  import data from "../../src/data/dataset1.json"
  import p_int from "../../src/data/dataset2.json"
  let imagePath = 'src/data/map_image3.jpg';
	let currentIndex = 0;
  let currentDisp = 1;
  

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
  
  // Find the latitude and longitude range
  const mapWidth = 600;
  const mapHeight = 600;
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

  let selectedCarId = ''; // store the selected car ID
  const uniqueCarIds = [...new Set(data.map(car => car.car_id))];
  // Function to handle the selection change
  function handleSelect(event) {
    selectedCarId = event.target.value;
    console.log('Selected car ID:', selectedCarId);
  }

//Section 2

  let tooltipText = '';

  function handleMouseOver(car) {
    tooltipText = `Location: (${car.lat}, ${car.long})`;
  }

  function handleMouseOut() {
    tooltipText = '';
  }
</script>

<style>

	ul {
		list-style: none;
		padding: 0;
		margin-top: 2em;
	}

	li {
		font-size: 1.2em;
		margin-bottom: 1em;
	}

  /*Section2*/

  .tooltip:hover title {
    visibility: visible;
  }
</style>

<main>
<h1>Final Project Data Visualization 2023</h1>
	<ul>
		<li>Name: <b>{name}</b></li>
		<li>University: <b>{university}</b></li>
		<li>Number: <b>{number}</b></li>
	</ul>

<label for="carId">Select a car ID:</label>
<select id="carId" on:change={handleSelect}>
  <option value="">Select an option </option>
  {#each uniqueCarIds as carId}
    <option value={carId}>{carId}</option>
  {/each}
</select>

{#if selectedCarId}
<p>Go to <a href={`/details?param1=${encodeURIComponent(selectedCarId)}`}>details</a> for car {selectedCarId}</p>
{/if}

<svg width=600 height=600>
  <rect x="0" y="0" width="600" height="600" fill="#efefef" />
  {#each data as car}
    <circle
      cx={(car.long - minLongitude) * LONGITUDE_TO_PIXEL_RATIO}
      cy={(maxLatitude - car.lat) * LATITUDE_TO_PIXEL_RATIO}
      r={car.car_id == selectedCarId ? "5.2" : "1.2"}
      opacity={car.car_id == selectedCarId ? "5.2" : "1.2"}
      fill={car.car_id == selectedCarId ? "red" : "black"}
    />
  {/each}
  {#each p_int as location}
    <g class="tooltip">
    <circle
      cx={(location.long - minLongitude) * LONGITUDE_TO_PIXEL_RATIO}
      cy={(maxLatitude - location.lat) * LATITUDE_TO_PIXEL_RATIO}
      r="10"
      fill={getLocationColor(location.type)}
      opacity = "1"
    />
    <title>{location.name}</title>
    </g>
  {/each}
</svg>
</main>