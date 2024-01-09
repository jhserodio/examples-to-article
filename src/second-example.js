import { createReadStream } from 'fs';
import http from 'http';


// curl localhost:3000 --output output.txt
http.createServer((req, res) => {
	createReadStream("big.file")
		.pipe(res)

	})
	.listen(3000, () => console.log('running at 3000'))
