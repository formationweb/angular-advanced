let age = signal(42)
let nom = signal('ana')
//let isMinor = signal(false)
let isMinor = computed(() => age() < 18)



effect(() => {
    console.log(age())
})

effect(() => {
    console.log( nom())
})

// 12