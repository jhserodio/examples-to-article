import http from 'http';

const streamStdin = process.stdin;
const streamStdout = process.stdout;

streamStdin
	.on('data', msg => console.log('into -> ', msg.toString()))

streamStdout
	.on('data', msg => console.log('out <- ', msg.toString()))


streamStdin.pipe(streamStdout)
