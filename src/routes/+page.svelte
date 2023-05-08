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

	
  onMount(async () => {
    const response = await fetch('src/data/dataset1.json');
    data = await response.json();
  });

 let selectedCarId = null;
  let cars = [];
/*
 onMount(() => {
    // Get unique car IDs from the JSON data
    cars = Array.from(new Set(data.map(item => item.car_id)));
  });

  function handleCarSelect(event) {
    // Update selected car ID when dropdown value changes
    selectedCarId = event.target.value;
  }

   $: selectedCarData = data.filter(item => item.car_id === selectedCarId);
*/
/*
  function handleChange(event) {
    const selectedIndex = event.target.selectedIndex;
    selectedData = data[selectedIndex];
  }*/
 function handleChange(event) {
    const selectedIndex = event.target.selectedIndex;
    const selectedCarId = parseInt(event.target.options[selectedIndex].value);
    selectedData = data.filter((item) => item.car_id === selectedCarId);
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

<!--
{#each data as item}
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
  </div>
{/each}
-->

  <div>
    <h1>Map</h1>
    <img src="src/data/map_image.jpg" alt="Example Image">
  </div>

<label for="dropdown">Select car:</label>
<select id="dropdown" on:change={handleChange}>
  {#each [...new Set(data.map(item => item.car_id))] as carId}
    <option value={carId}>{`Car ${carId}`}</option>
  {/each}
</select>


</main>

