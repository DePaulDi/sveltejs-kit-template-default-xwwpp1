<nav>
	<a href="/">home</a>
	<a href="/about">about</a>
</nav>

<!-- App.svelte -->
<script>
	let name = 'Pavlos Dimadis';
	let university = 'KU Leuven';
	let number = 'r0877868';
  import { onMount } from 'svelte';
  let data = [];
  let imagePath = 'src/data/map_image.jpg';
  let selectedData = [];

	
  onMount(async () => {
    const response = await fetch('src/data/dataset1.json');
    data = await response.json();
  });


 function handleChange(event) {
    const selectedIndex = event.target.selectedIndex;
    const selectedCarId = parseInt(event.target.options[selectedIndex].value);
    selectedData = data.filter((item) => item.car_id === selectedCarId);
  }
/*
  function getCircleCoords(longitude, latitude) {
  const imgWidth = 1000;
  const imgHeight = 667;
  const longRange = [-3.192473, -3.184803];
  const latRange = [55.946233, 55.942617];

  const x = Math.floor(((longitude - longRange[0]) / (longRange[1] - longRange[0])) * imgWidth);
  const y = Math.floor(((latRange[1] - latitude) / (latRange[1] - latRange[0])) * imgHeight);

  return { x, y };
}

function handleMouseOver(event) {
    const circle = event.target;
    const circleCoords = getCircleCoords(circle);
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = `Lat: ${circleCoords.lat}, Long: ${circleCoords.long}`;
    circle.parentNode.appendChild(tooltip);
  }

  function handleMouseOut(event) {
    const circle = event.target;
    const tooltip = circle.parentNode.querySelector(".tooltip");
    tooltip && tooltip.remove();
  }

  function handleClick(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  const coords = getCircleCoords(x, y);
  const selectedPoint = data.find((item) => {
    return item.lat === coords.lat && item.long === coords.long;
  });
  if (selectedPoint) {
    selectedData = [selectedPoint];
  }
}*/
function getCircleCoords(item) {
  const mapWidth = 0.018;
  const mapLongMin = 4.694411;
  const mapLatMax = 51.06842;
  const x = (item.long - mapLongMin) / mapWidth;
  const y = (mapLatMax - item.lat) / mapLatMax;
  const radius = 0.01;
  return `${x},${y},${radius}`;
}

function handleMouseOver(item) {
  console.log(`Mouse over car ID: ${item.car_id}`);
}

function handleMouseOut(item) {
  console.log(`Mouse out car ID: ${item.car_id}`);
}

function handleClick(item) {
  console.log(`Clicked car ID: ${item.car_id}`);
}

</script>

<style>


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
  
<label for="dropdown">Select car:</label>
<select id="dropdown" on:change={handleChange}>
  {#each [...new Set(data.map(item => item.car_id))] as carId}
    <option value={carId}>{`Car ${carId}`}</option>
  {/each}
</select>

 {#if selectedData !== null}
    {#each selectedData as item}
      <div>
        <p>Key: {item.key}</p>
        <p>Car ID: {item.car_id}</p>
        <p>Day: {item.day}</p>
        <p>Hour: {item.hour}</p>
        <p>Minute: {item.minute}</p>
        <p>Cumulative Minute: {item.cumulative_minute}</p>
        <p>Longitude: {item.long}</p>
        <p>Latitude: {item.lat}</p>
        <p>Speed: {item.speed}</p>
        <p>Cumulative Minute Total: {item.cumulative_minute_total}</p>
        <br/>
      </div>
    {/each}
  {/if}

<div>
  <h1>Map</h1>
  <map name="map_image3.jpg">
    <img src="src/data/map_image3.jpg" alt="Example Image" usemap="#map_image">
    {#each selectedData as item}
      <area
        alt="Marker 1"
        shape="circle"
        coords="{getCircleCoords(item)}"
        onmouseover={() => handleMouseOver(item)}
        onmouseout={() => handleMouseOut(item)}
        onclick={() => handleClick(item)}
        aria-label="Marker for longitude: {item.long} and latitude: {item.lat}"
      />
    {/each}
  </map>
</div>



</main>
