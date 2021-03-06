const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date()

// A simple async POST request function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

// A simple async POST request function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

// A simple function to format the time as a string
const getTime = () => {
    const d = new Date();
  
    // Use String.padStart to add leading zeroes
    const hours = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');
  
    // Return the time as a string
    return `${hours}:${mins}`;
};

// Login user to access chat room.
const login = async () => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/
    // Grab the user's input
    const username = usernameInput.value; 
    console.log(username);
    // Clear out any previous error messages
    errorContainer.innerHTML = '';

    if(!username || username.trim() === '') {
        let err_node = document.createElement('p');
        err_node.innerHTML = "You must enter a username to enter chat room.";
        err_node.style.color = "red";
        errorContainer.appendChild(err_node);
        return;
    }

    const data = await postData('/prove12/login', {
        username,
    });

    if(data.error) {
        let err_node = document.createElement('p');
        err_node.innerHTML = data.error;
        err_node.style.color = "red";
        errorContainer.appendChild(err_node);
        return;
    }

    socket.emit('newUser', username, getTime());
    window.location = '/prove12/chat';
    
}