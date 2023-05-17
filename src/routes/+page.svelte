<nav>
	<a href="/">home</a>
	<a href="/cars">cars</a>
</nav>

<!-- App.svelte -->
<script>
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

  function updateImage(currentDisp) {
    currentDisp++;
    let dataset = data[currentDisp];
    altText = `Car ${dataset.car_id} at ${dataset.speed} km/h`;
  }

  onMount(() => {
    updateImage();
  });
  
  const mapWidth = 600;
  const mapHeight = 600;

  // Find the latitude and longitude range
  const latitudes = data.map(car => car.lat);
  const longitudes = data.map(car => car.long);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const numCars = data.map(car => car.car_id);
  const numCar = Math.max(...numCars);


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

</script>

<style>

/*
        svg {
            border: 1px;
            border-style: solid;
        }
        circle {
            fill: steelblue;
            opacity: 0.5;
        }
        circle:hover {
            fill: red;
        }
*/      


	h1 {
		font-size: 2em;
		color: #333;
		text-align: center;
		margin-top: 2em;
	}


	ul {
		list-style: none;
		padding: 0;
		margin-top: 2em;
	}

	li {
		font-size: 1.2em;
		margin-bottom: 1em;
	}
</style>

<main>
<!--	<h1>My Information</h1> -->
	<ul>
		<li>Name: <b>{name}</b></li>
		<li>University: <b>{university}</b></li>
		<li>Number: <b>{number}</b></li>
	</ul>

<label for="carId">Select a car ID:</label>
<select id="carId" on:change={handleSelect}>
  {#each uniqueCarIds as carId}
    <option value={carId}>{carId}</option>
  {/each}
</select>

 <svg width=600 height=600>
  <rect x="0" y="0" width="600" height="600" fill="#efefef" />
  {#each data as car}
    <circle
      cx={(car.long - minLongitude) * LONGITUDE_TO_PIXEL_RATIO}
      cy={(maxLatitude - car.lat) * LATITUDE_TO_PIXEL_RATIO}
      r="2"
      opacity="0.2"
      fill="black"
    />
  {/each}
  {#each p_int as location}
    <circle
      cx={(location.long - minLongitude) * LONGITUDE_TO_PIXEL_RATIO}
      cy={(maxLatitude - location.lat) * LATITUDE_TO_PIXEL_RATIO}
      r="10"
      fill={getLocationColor(location.type)}
      opacity = "1"
    />
  {/each}
</svg>
</main>
