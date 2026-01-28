console.log(__dirname); // Shows the directory of this file
console.log(__filename); // Shows the absolute path of this file

console.log(process.cwd()); // Shows the current working directory

const a = 5;
const myFunction = () => {
    console.log('Hello from myFunction');
}

module.exports = {
    a,
    myFunction
};
