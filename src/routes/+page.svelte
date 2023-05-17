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
  let p_int = [];
  let imagePath = 'src/data/map_image3.jpg';
  let selectedData = [];
  let jsonData;
	
  onMount(async () => {
    const response = await fetch('src/data/dataset1.json');
    data = await response.json();
  });

/*
 $: {
    if (data.length!=0) {
      let minLat;
      let maxLat;
      let minLong;
      let maxLong;
      console.log("length");
      console.log(data.length);
      for (let i=0;i<data.length;i++)
      {
      minLat = Math.min(data[i].map(car => car.lat));
      console.log(minLat);
      maxLat = Math.max(data[i].map(car => car.lat));
      console.log(maxLat);
      minLong = Math.min(data[i].map(car => car.long));
      console.log(minLong);
      maxLong = Math.max(data[i].map(car => car.long));
      console.log(maxLong);
      }
      const LONG_FACTOR = 600 / (maxLong - minLong);
      const LAT_FACTOR = 600 / (maxLat - minLat);
      console.log(LONG_FACTOR);
      console.log(LAT_FACTOR);
    }
    else{
      console.log("not_loaded");
    }
  }
*/
 onMount(async () => {
    const response = await fetch('src/data/dataset2.json');
    p_int = await response.json();
  });

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

  let currentIndex = 0;
  let currentDisp = 1;
  let imageUrl = '';
  let altText = '';
  let carId = '';
  let day = '';
  let hour = '';
  let minute = '';
  let speed = '';

  function updateImage(currentDisp) {
    currentDisp++;
    let dataset = data[currentDisp];
    altText = `Car ${dataset.car_id} at ${dataset.speed} km/h`;
  }

  onMount(() => {
    updateImage();
  });
 
  const MIN_LONGITUDE = 24.8825;
  const MAX_LATITUDE = 36.0675;
  
  const mapWidth = 600;
  const mapHeight = 600;

  // Find the latitude and longitude range
  const latitudes = data.map(car => car.lat);
  const longitudes = data.map(car => car.long);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);

  // Calculate the latitude and longitude differences
  const latitudeRange = maxLatitude - minLatitude;
  const longitudeRange = maxLongitude - minLongitude;

  // Calculate the latitude and longitude ratios
  const LATITUDE_TO_PIXEL_RATIO = mapHeight / latitudeRange;
  const LONGITUDE_TO_PIXEL_RATIO = mapWidth / longitudeRange;
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
