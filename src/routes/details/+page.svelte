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

</script>


<main>
	<ul>
		<li>Name: <b>{name}</b></li>
		<li>University: <b>{university}</b></li>
		<li>Number: <b>{number}</b></li>
	</ul>

<p>This is the current value {selectedCarId}</p>
	
</main>