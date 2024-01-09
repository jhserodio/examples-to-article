import { pipeline, Readable, Writable } from 'stream'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)

const readableStream = Readable({
	read: function () {
		this.push(" Carambolas -> 1")
		this.push(" Carambolas -> 2")
		this.push(" Carambolas -> 3")
		this.push(null)
	}
})


const writableStream = Writable({
	write (chunk, _, cb) {
		console.log('msg', chunk.toString())
		cb()
	}	
})

await pipelineAsync(
	readableStream,
	writableStream
)
