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
  let imagePath = 'src/data/map_image3.jpg';
  let selectedData = [];

	
  onMount(async () => {
    const response = await fetch('src/data/dataset1.json');
    data = await response.json();
  });


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
    carid = dataset.car_id;
    day = dataset.day;
    hour = dataset.hour;
    minute = dataset.minute;
    speed = dataset.speed;

  }

  onMount(() => {
    updateImage();
  });
  /*
  $: {
    let dataset = Data[currentIndex];
    $carId = dataset.car_id;
    $day = dataset.day;
    $hour = dataset.hour;
    $minute = dataset.minute;
    $speed = dataset.speed;
  }
*/
let filteredCars = [];
$: filteredCars = data.filter(car => data.car_id === currentDisp);

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
<label for="dropdown">Select car:</label>
<select id="dropdown" on:change={handleChange}>
  {#each [...new Set(data.map(item => item.car_id))] as carId}
    <option value={carId}>{`Car ${carId}`}</option>
  {/each}
</select>

<div>
  <h1>Map</h1>
  <map name="map_image3.jpg">
    <img src="src/data/map_image3.jpg" alt="Examplee" usemap="#map_image">
  </map>
</div>
-->

 <img src={imagePath} alt={altText} style="width: 100%; max-width: 600px; height: auto;">
  <button on:click={() => { currentDisp--; updateImage(currentDisp); }}>Previous</button>
  <button on:click={() => { currentDisp++; updateImage(currentDisp); }}>Next</button>
  <h1>Cars with car_id {currentDisp}</h1>
  {#each data as car}
    {#if car.car_id === currentDisp}
      <div>
        <p>Key: {car.key}</p>
        <p>Car ID: {car.car_id}</p>
        <p>Day: {car.day}</p>
        <p>Hour: {car.hour}</p>
        <p>Minute: {car.minute}</p>
        <p>Cumulative Minute: {car.cumulative_minute}</p>
        <p>Longitude: {car.long}</p>
        <p>Latitude: {car.lat}</p>
        <p>Speed: {car.speed}</p>
        <p>Cumulative Minute Total: {car.cumulative_minute_total}</p>
        <br/>
      </div>
    {/if} 
  {/each}
  
<!--
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
-->
</main>
