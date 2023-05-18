<nav>
	<a href="/">overview</a>
</nav>

<script>
	import { onMount } from 'svelte';

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
    filteredData = dataset.filter(
      (item) =>
        item.day === selectedDay &&
        item.cumulative_minute_total <= selectedMinute
    );
  }

  function handleSliderChange(event) {
    selectedMinute = parseInt(event.target.value);
    filterData();
  }
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

  <h2>Filtered Data:</h2>
  <ul>
    {#each filteredData as item (item.key)}
      <li>{item.key}</li>
    {/each}
  </ul>
</div>
</main>