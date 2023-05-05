export default defineNuxtRouteMiddleware(to => {
	const cookieTmToken = useCookie('tm-token')
	if (!cookieTmToken.value && to.path !== '/login') {
		return navigateTo('/login')
	}
	if (cookieTmToken.value && to.path === '/login') {
		return navigateTo('/')
	}
})
