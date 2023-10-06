import { EventEmitter } from 'events'

interface NodeCallback<T> {
	(err: any, result?: undefined | null): void;
	(err: undefined | null, result: T): void;
}

function ticker (numberOfMilliseconds: number, callback: NodeCallback<number>) {
	const eventEmitter = new EventEmitter()
	const startTime = new Date().getTime()
	let tickCount = 0

	if (startTime % 5 === 0) {
		callback("Start time divisible by 5")
		eventEmitter.emit('Error', 'Time divisible by 5')
	}

	process.nextTick(() => eventEmitter.emit('tick', 'New tick'))

	const intervalId = setInterval(() => {
		const currentTime = new Date().getTime()
		if (currentTime % 5 === 0) {
			callback("Time divisible by 5")
			eventEmitter.emit('Error', 'Time divisible by 5')
		}

		if (currentTime > startTime + numberOfMilliseconds) {
			callback(null, tickCount)
			clearInterval(intervalId)
			eventEmitter.emit('completed', tickCount)
		}

		tickCount++
		eventEmitter.emit('tick', 'New tick')
	}, 50)

	return eventEmitter
}

ticker(1000, (error, tickCount) => {
	if (error) console.log("Callback error:", error)
	if (tickCount) console.log("Callback message:", tickCount)
})
	.on('tick', message => console.log("Event message:", message))
	.on('completed', x => console.log("Event completed with count:", x))
	.on('Error', error => console.log("Event Error:", error));
