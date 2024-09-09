// Khai báo port
// Khởi động server nodejs

const app = require("./src/app");

const PORT = 3030

// port, callback when start
const server = app.listen(PORT, () => {
    console.log(`ECM start with port: ${PORT}`);
})

// The process object provides information about, and control over, the current Node.js process.
// The process object is an instance of EventEmitter. https://nodejs.org/api/events.html#class-eventemitter
process.on('SIGINT', () => {
    server.close(() => console.log(`ECM close proccess`));
})