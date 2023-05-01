const qS = el => {return document.querySelector(el)}
const cE = el => {return document.createElement(el)}
const formId = qS('#formId')
const div = qS('.textContainer')

formId.addEventListener('submit', (ev) => {
    ev.preventDefault()
    // const inputText = formId[0].value
    const data = { message: "hello world" }
    const mainURL = window.location.origin
    // fetch data from backend
    fetch(`${mainURL}/api/monopoli`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(data => data.json()
    .then(result => {
        // res dari post: api/monopoli 
    }))
    .catch(err => console.log(err))
})

if(formId) {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;
    const pusher = new Pusher('261b7993014c63c9559d', {
        cluster: "ap1"
    });
    
    const channel = pusher.subscribe("monopoli-back");
    channel.bind("monopoli-front", function(data) {
        div.innerText += ` ${data.message}, `
    });
}