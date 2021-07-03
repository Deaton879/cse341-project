// Kickstart socket.io
const socket = io('/');

// Repopulate the list when the server broadcasts an event
socket.on('update-list', () => {
    populateList();
});

const buildList = () => {
    const names = document.getElementById('nameList')
    
    fetch('/prove11/fetchAll')
        .then(res => res.json())
        .then(data => {
            // Clear the list first
            while (names.firstChild) names.firstChild.remove()

            // Rebuild the list
            for (const avenger of data.avengers) {
                const li = document.createElement('li');
                const b = document.createElement('b');
                const b2 = document.createElement('b');
                b2.classList.add('b2');
                b.appendChild(document.createTextNode(avenger.name));
                b2.appendChild(document.createTextNode(avenger.alias));
                li.appendChild(b);
                li.appendChild(b2);
                names.appendChild(li)
            }
        })
        .catch(err => {
            console.error(err)
        })
}

const submitName = () => {
    // Get the submitted name
    const newName = document.getElementById('newName').value; 
    // Get the submitted power
    const alias = document.getElementById('alias').value;
    // Reset the error display element
    document.getElementById('error').innerHTML = " ";

    // Send a POST request using fetch()
    fetch('/prove11/insertName', {
        method: 'POST', 
        headers: {
            // Set the Content-Type to JSON since that is what the server is expecting
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newName, alias })
    })
        .then(res => {

            // If name is duplicate, display error message
            if(res.status === 403) {
                document.getElementById('error').innerHTML = 'That name is already on the list<br>';
            }
            
            // If submission is blank, display error message
            if(res.status === 400) {
                document.getElementById('error').innerHTML = 'Please fill in a name FIRST,<br> THEN press submit<br>';
            }

            // Clear the input
            document.getElementById('newName').value = '';
            document.getElementById('alias').value = '';

            // Rebuild the updated list
            buildList();

            // Have the server "broadcast" what was changed to all users
            socket.emit('new-name');
        })
        .catch(err => {
            // Clear the input
            document.getElementById('newName').value = '';
            console.error(err);
        })
}

// Initialize the list
buildList()