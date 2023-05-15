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
  let data = [];
  let p_int = [];
  let imagePath = 'src/data/map_image3.jpg';
  let selectedData = [];

	
  onMount(async () => {
    const response = await fetch('src/data/dataset1.json');
    data = await response.json();
  });

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
  const LONGITUDE_TO_PIXEL_RATIO = 500 / 0.025;
  const LATITUDE_TO_PIXEL_RATIO = 500 / 0.025;
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

 <svg width=500 height=500>
  {#each data as car}
    <circle
      cx={(car.long - MIN_LONGITUDE) * LONGITUDE_TO_PIXEL_RATIO}
      cy={(MAX_LATITUDE - car.lat) * LATITUDE_TO_PIXEL_RATIO}
      r="2"
      opacity="0.2"
      fill="black"
    />
  {/each}
  {#each p_int as location}
    <circle
      cx={(location.long - MIN_LONGITUDE) * LONGITUDE_TO_PIXEL_RATIO}
      cy={(MAX_LATITUDE - location.lat) * LATITUDE_TO_PIXEL_RATIO}
      r="10"
      fill={getLocationColor(location.type)}
      opacity = "1"
    />
  {/each}
</svg>
</main>
