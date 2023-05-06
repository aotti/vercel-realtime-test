const qS = el => {return document.querySelector(el)}
const cE = el => {return document.createElement(el)}
const formId = qS('#formId')
const div = qS('.textContainer')

const pubnub = new PubNub({
    subscribeKey: 'sub-c-8d86234e-6606-4b80-a3df-96ccbe749a01',
    userId: 'myUserId'
})

formId.addEventListener('submit', (ev) => {
    ev.preventDefault()
    // const inputText = formId[0].value
    const data = { message: "hello world" }
    const mainURL = window.location.origin
    // fetch data from backend
    // fetch(`${mainURL}/api/monopoli`, {
    //     method: 'post',
    //     body: JSON.stringify(data),
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     })
    // })
    // .then(data => data.json()
    // .then(result => {
    //     // res dari post: api/monopoli 
    // }))
    // .catch(err => console.log(err))

})

if(formId) {
    pubnub.subscribe({
        channels: ['test_channel']
    })
    pubnub.addListener({
        message: function (m) {
            div.innerText += ` ${m.channel} - ${m.message},`
        }
    })
}