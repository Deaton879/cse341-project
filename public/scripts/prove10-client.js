const buildList = () => {
    const names = document.getElementById('nameList')
    
    fetch('/prove10/fetchAll')
        .then(res => res.json())
        .then(data => {
            // Clear the list first
            while (names.firstChild) names.firstChild.remove()

            // Repopulate the list
            for (const avenger of data.avengers) {
                const li = document.createElement('li')
                li.appendChild(document.createTextNode(avenger.name))
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
    // Reset the error display element
    document.getElementById('error').innerHTML = " ";

    // Send a POST request using fetch()
    fetch('/prove10/insertName', {
        method: 'POST', 
        headers: {
            // Set the Content-Type to JSON since that is what the server is expecting
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newName })
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
            
            // Rebuild the updated list
            buildList()
        })
        .catch(err => {
            // Clear the input
            document.getElementById('newName').value = '';
            console.error(err)
        })
}

// Initialize the list
buildList()