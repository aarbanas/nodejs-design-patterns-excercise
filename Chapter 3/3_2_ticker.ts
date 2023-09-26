import { EventEmitter } from 'events'

function ticker (numberOfMilliseconds: number, callback: (tickCount: number) => void) {
	const eventEmitter = new EventEmitter()
	const startTime = new Date().getTime()
	let tickCount = 0

	const intervalId = setInterval(() => {
		const currentTime = new Date().getTime()
		if (currentTime > startTime + numberOfMilliseconds) {
			callback(tickCount)
			clearInterval(intervalId)
		}

		tickCount++
		eventEmitter.emit('tick', 'New tick')
	}, 50)

	return eventEmitter
}

ticker(1000, (tickCount) => {
	console.log(tickCount)
})
	.on('tick', tock => console.log(tock))
	.on('completed', x => console.log(x));
