const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user')
const date = new Date() // Date implementation

socket.on('newMessage', data => {
    addMessage(data,)
});

// A simple function to format the time as a string
const getTime = () => {
    const d = new Date();
  
    // Use String.padStart to add leading zeroes
    const hours = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');
  
    // Return the time as a string
    return `${hours}:${mins}`;
};

// Post message to board
const postMessage = () => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/
    // Get input values from the page
    const message = messageEl.value.trim();
    const from = user.value;
    const time = getTime();

    const data = { message, from, time };

    // Emit the message
    socket.emit('message', data);

    // Add the message to the page
    addMessage(data, true);

    // Clear input
    messageEl.value = '';

};

// Add message from any user to chatbox, determine if added
// by current user.
const addMessage = (data = {}, user = false) => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/
    // Add an li to the page containing the new message
    // Give it the uMessage class if from the current user

    // Set message to received if user did not send the message
    let x = "";
    let y = "";
    if(!user) {
        x = "Received";
        y = "uSent";
    } 
    // Set message to sent if user sent the message
    else {
        x = "Sent";
        y = x;
    }
    chatBox.innerHTML += `
    <li class="message${user ? ' uMessage' : ''}">
        ${data.from} <br>
        <br>${data.message} <br>
        <br><i class="${y}">${x} @${data.time} &#10003;</i> 
    </li>
    `;
};
