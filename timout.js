setInterval(function run() {
    console.log("hello");

}, 1000)
function repeat() {
    setTimeout(function run() {
        console.log("hello");
    })
    repeat()
}