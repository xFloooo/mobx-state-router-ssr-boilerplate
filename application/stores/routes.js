export const routes = [
    {
        name: 'home',
        pattern: '/'
    },
    {
        name: 'items',
        pattern: '/items',
        beforeEnter: (fromState, toState, routerStore) => {
            const rootStore = routerStore.rootStore;
            return rootStore.itemsStore.loadItems();
        }
    },
    {
        name: 'notFound',
        pattern: '/not-found'
    }
];
