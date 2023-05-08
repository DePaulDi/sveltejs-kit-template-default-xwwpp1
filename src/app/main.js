//import App from './datavis';
//import App from './App.svelte';
import App from './1st';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
