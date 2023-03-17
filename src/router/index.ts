import { createRouter as vueCreateRouter, createWebHistory, createMemoryHistory } from 'vue-router';

const createHistory = import.meta.env.SSR ? createMemoryHistory : createWebHistory;

function createRouter() {
	const router = vueCreateRouter({
		history: createHistory(),
		routes: [
			{
				path: '/',
				component: () => import('@/pages/main/index.vue'),
			}
		],
	});

	return router;
}

export {
	createRouter,
}