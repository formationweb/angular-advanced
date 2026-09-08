const age = signal(42)
const isMinor = computed(() => age() < 18)

age.set(15)
console.log(isMinor())

effect(() => {
    console.log(age())
})