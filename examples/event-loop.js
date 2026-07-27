console.log('1')

// Macrotask
setTimeout(() => console.log('2'), 0)

// Microtask
Promise.resolve().then(() => {
    console.log('3')

    // Macrotask
    setTimeout(() => console.log('4'), 0)
})

// Microtask
Promise.resolve().then(console.log('5'))

console.log('6')
