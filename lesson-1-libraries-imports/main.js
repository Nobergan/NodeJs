// console.log('Hello from NodeJs'); // Prints Hello from NodeJs in the console by command 'node main.js'
//
// console.log(__dirname); // Shows the directory of this file
// console.log(__filename); // Shows the absolute path of this file
//
// console.log(process.cwd()); // Shows the current working directory
//
// require('./services/test-service'); // Imports the test-service.js file
//
// const { a, myFunction } = require('./services/test-service'); // Destructuring assignment of variables from the test-service.js file
// console.log(a); // Prints 5
// myFunction(); // Prints Hello from myFunction

//////////////////////////////
// NodeJs library ==> http
//////////////////////////////

// const http = require('node:http'); // Imports the NodeJs library http
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//
//     if (req.url === '/cars') {
//         switch (req.method) {
//             case 'GET':
//                 return res.end(JSON.stringify({
//                     data: 'My cars'
//                 }))
//             case 'POST':
//                 return res.end(JSON.stringify({
//                     data: 'New car added'
//                 }))
//         }
//     }
// }); // Creates a server
//
// server.listen(5555); // Starts listening on port 3000

//////////////////////////////
// NodeJs library ==> path
//////////////////////////////

// const path = require('node:path'); // Imports the NodeJs library path
//
// const filePath = path.join(process.cwd(), 'services', 'test-service.js'); // Returns the absolute path of the test-service.js file
//
// console.log(filePath); // Prints the absolute path of the test-service.js file
//
// console.log(path.basename(filePath)); // Prints the name of the last part of the path
// console.log(path.dirname(filePath)); // Prints everything except the last part of the path
// console.log(path.extname(filePath)); // Prints the extension of the file
// console.log(path.parse(filePath)); // Returns an object with the parsed path
// console.log(path.normalize('/\Users////v.kostetskyi/\Documents/\okten/\NodeJs////services')); // Normalizes the path and returns in this case "/Users/v.kostetskyi/Documents/okten/NodeJs/services"
// console.log(path.isAbsolute(filePath)); // Returns true if the path is absolute

//////////////////////////////
// NodeJs library ==> readLine (Read input and output from the terminal)
//////////////////////////////

// const readline = require('node:readline/promises'); // Imports the NodeJs library readLine
//
// const start = async () => {
//     const rlInterface = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//
//     const name = await rlInterface.question('What is your name? ');
//     const age = await rlInterface.question('How old are you? ');
//
//     console.log(`Hello ${name}, you are ${age} years old`);
//
//     rlInterface.close();
//     // or
//     // process.exit(0);
// }
//
// start().catch(err => console.error(err));

//////////////////////////////
// NodeJs library ==> fs (File System)
//////////////////////////////

// const afs = require('node:fs/promises');
// const fs = require('node:fs');
// const path = require('node:path');
// const readline = require('node:readline/promises');
//
// const start = async () => {
//     // await afs.mkdir(path.join('storage', 'files'), { recursive: true }); // Creates a directory named 'files' inside the 'storage' directory
//     //
//     const filePath = path.join('storage', 'files', 'myFile.txt'); // Creates a file named 'myFile.txt' inside the 'storage/files' directory
//     // await afs.writeFile(filePath, 'Hello from NodeJs!\n'); // Writes 'Hello from NodeJs!' to the file 'myFile.txt'
//     // await afs.appendFile(filePath, 'Hello from NodeJs!!!!!!!!!!\n'); // Appends 'Hello from NodeJs!!!!!!!!!!' to the file 'myFile.txt'
//     // const arrayBuffer = await afs.readFile(filePath, 'utf-8'); // Reads the file 'myFile.txt' and returns its content as an array buffer
//     // console.log(arrayBuffer);
//     // await afs.rename(filePath, path.join(process.cwd(), 'storage', 'replacedFiles', 'myReplacedFile.txt')); // Renames the file 'myFile.txt' to 'myReplacedFile.txt' and moves it to the 'storage/replacedFiles' directory
//     // const filePathReplaced = path.join('storage', 'replacedFiles', 'myReplacedFile.txt');
//     // await afs.rename(filePathReplaced, path.join(path.dirname(filePathReplaced), 'myRenamedFile.txt')); // Renames the file 'myReplacedFile.txt' to 'myRenamedFile.txt'
//     // await afs.copyFile(filePath, path.join(path.dirname(filePath), 'myCopiedFile.txt')); // Copies the file 'myFile.txt' to 'myCopiedFile.txt'
//     // await afs.rm(path.join(process.cwd(), 'storage'), { recursive: true }); // Deletes the 'storage' directory with its children
//     // await afs.unlink('./storage/files/myFile.txt'); // Deletes the file myFile.txt'
//
//     // const stats = await afs.stat('./main.js'); // Returns information about the file
//     // console.log(stats);
//     // console.log(stats.isDirectory()); // Returns true if the file is a directory
//
//     /*** This code demonstrates how to read a file line-by-line in a streaming fashion using Node.js' (File System) and modules.
//         It processes each line from an input file, , and appends it to an output file, , along with a defined separator. `fs``readline``myFile.txt``myResultFile.txt`
//      ***/
//     // const fileStream = fs.createReadStream(filePath, 'utf-8'); // Creates a readable stream from the file 'myFile.txt'
//     // const rlInterface = readline.createInterface({ input: fileStream }); // Creates a readLine interface from the readable stream
//     // try {
//     //     for await (const line of rlInterface) {
//     //         await afs.appendFile('./storage/files/myResultFile.txt', `${line}--------------\n`); // Appends each line of the file 'myFile.txt' to the file 'myResultFile.txt'
//     //     }
//     // } finally {
//     //     await rlInterface.close(); // Closes the readLine interface
//     // }
//
//     /*** This code demonstrates how to copy a binary file () to another file () using Node.js' file streaming capabilities.
//         It makes use of `Readable` and `Writable` streams, provided by the (File System) module, to perform efficient, non-blocking file copying. `picture.jpeg``picture-copy.jpeg``fs`
//      ***/
//     // const readStream = fs.createReadStream('picture.jpeg');
//     // const writeStream = fs.createWriteStream('picture-copy.jpeg');
//     // // readStream.on('data', chunk => writeStream.write(chunk));
//     // readStream.pipe(writeStream);
// }
//
// start().catch(err => console.error(err));

//////////////////////////////
// NodeJs library ==> os (Operating System)
//////////////////////////////

// const os = require('node:os');
//
// console.log(os.arch()); // Prints the architecture of the processor
// console.log(os.cpus()); // Prints information about the CPU
// console.log(os.totalmem()/(1024*1024*1024) + ' GB'); // Prints the total amount of memory in GB
// console.log(os.freemem()/(1024*1024*1024) + ' GB'); // Prints the free memory in GB
// console.log(os.homedir()); // Prints the home directory of the current user
// console.log(os.hostname()); // Prints the hostname of the current machine
// console.log(os.release()); // Prints the operating system release
// console.log(os.tmpdir()); // Prints the system default temporary directory
// console.log(os.type()); // Prints the operating system type
// console.log(os.uptime()); // Prints the system uptime in seconds
// console.log(os.userInfo()); // Prints information about the current user
// console.log(os.version()); // Prints the operating system version
// console.log(os.networkInterfaces()); // Prints information about all network interfaces
// console.log(os.platform()); // Prints the operating system platform

//////////////////////////////
// NodeJs library ==> events (Event Emitter)
//////////////////////////////

// const emitter = require('node:events');
//
// const eventEmitter = new emitter.EventEmitter(); // Creates an instance of the EventEmitter class
//
// eventEmitter.on('firstEvent', (name, age) => console.log('firstEvent emitted!', name, age)); // Prints 'firstEvent emitted! Viktor 25'
// eventEmitter.on('secondEvent', () => console.log('secondEvent emitted!')); // Prints 'secondEvent emitted!'
// eventEmitter.once('thirdEvent', () => console.log('thirdEvent emitted only once!')); // Prints 'thirdEvent emitted only once!'
//
// // eventEmitter.emit('firstEvent');
// eventEmitter.emit('firstEvent', 'Viktor', 25);
// eventEmitter.emit('secondEvent');
// // eventEmitter.emit('secondEvent');
// // eventEmitter.emit('secondEvent');
// // eventEmitter.emit('secondEvent');
// eventEmitter.emit('thirdEvent');
// eventEmitter.emit('thirdEvent');
// eventEmitter.emit('thirdEvent');



