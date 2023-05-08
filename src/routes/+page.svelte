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
  
	
  onMount(async () => {
    const response = await fetch('src/data/dataset1.json');
    data = await response.json();
  });

 let carIds = Array.from(new Set(data.map(item => item.car_id)));
  let selectedCarId = carIds[0]; // Initialize with the first car ID
  
  function handleChange(event) {
    selectedCarId = parseInt(event.target.value);
  }
  
  function getFilteredData() {
    return data.filter(item => item.car_id === selectedCarId);
  }
  /*
  function handleChange(event) {
    selectedOption = event.target.value;
  }
	-->*/
  async function fetchData() {
    const response = await fetch('src/data/dataset1.json');
    const jsonData = await response.json();
    data = jsonData.items;
  }

  fetchData();
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


  <div>
    <h1>Map</h1>
    <img src="https://storage.googleapis.com/gweb-cloudblog-publish/images/MapImage2_cwGJZTs.max-600x600.png" alt="Example Image">
  </div>

<select on:change={handleChange}>
  {#each carIds as carId}
    <option value={carId}>{carId}</option>
  {/each}
</select>

{#each getFilteredData() as item}
  <p>{item.key} - {item.car_id} - {item.long}, {item.lat} - {item.speed}</p>
{/each}

</main>

