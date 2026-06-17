
const age = signal(15)
const isMinor = computed(() => age() < 18)

effect(() => {
    console.log(age())
})