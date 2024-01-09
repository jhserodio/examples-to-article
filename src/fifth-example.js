import { pipeline, Readable, Transform, Writable } from 'stream'
import { promisify } from 'util'
import { createWriteStream } from 'fs';


const pipelineAsync = promisify(pipeline)

const readableStream = Readable({
	read () {
		for (let i = 0; i < 30; i++) {
			const person = { id: Date.now() + i, name: `Carambolas => ${i}`}
			const data = JSON.stringify(person)
			this.push(data)
		}
	}
})

const transformToCSV = Transform({
	transform(chunk, _, cb) {
		const data = JSON.parse(chunk)
		const result = `${data.id}, ${data.name} \n`;

		cb(null, result)
	}
})

const transformSetHeader = Transform({
	transform(chunk, _, cb) {
		this.counter = this.counter ?? 0;

		if (this.counter) {
		  return cb(null, chunk)
		}
	
		this.counter++;

		const result = "never Die ie ie!!! \n".concat(chunk);

		cb(null, result)
	}
})

await pipelineAsync(
	readableStream, 
	transformToCSV, 
	transformSetHeader, 
	createWriteStream('carambolas-result.txt')
)
