let currentSession = 'image';

function inputText() {
    currentSession = 'text';
    document.getElementById('imageUploadSection').style.display = 'none';
    document.getElementById('textUploadSection').style.display = 'block';
}

function handleImage() {
    const input = document.getElementById('imageUpload');
    if (input.files && input.files[0]) {
        currentSession = 'image';
        document.getElementById('textUploadSection').style.display = 'none';
        document.getElementById('imageUploadSection').style.display = 'block';
        const imageFile = input.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        };
        reader.readAsDataURL(imageFile);

        const formData = new FormData();
        formData.append('image', imageFile);

        fetch('https://port-0-lot2mind-back-1272llwu7c2fk.sel5.cloudtype.app/upload_image', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const hashDiv = document.getElementById('hash');
                hashDiv.innerHTML = `SHA256 Hash: ${data.hash}`;
                displayData();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
    }
    this.target.value = ''
}

function saveText() {
    if (currentSession != 'text') {
        return;
    }
    const text = document.getElementById('textInput').value;
    fetch('https://port-0-lot2mind-back-1272llwu7c2fk.sel5.cloudtype.app/upload_text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
        .then(response => response.json())
        .then(data => {
            const hashDiv = document.getElementById('hash');
            hashDiv.innerHTML = `SHA256 Hash: ${data.hash}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayData() {
    const myhash = [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]];
    //const hashResultElement = document.getElementById('hash-result');
    //hashResultElement.textContent = `SHA-256 해싱 결과: ${hashResult} 그리고: ${myhash}`;
    const dataContainer = document.getElementById('data-container');
    while (dataContainer.firstChild) {
        dataContainer.removeChild(dataContainer.firstChild);
    }
    var ballclassname = "";
    var temp = 0;
    for (const rowData of myhash) {
        const dataRow = document.createElement('div');
        dataRow.classList.add('num');
        for (const item of rowData) {
            const dataItem = document.createElement("span");
            dataItem.classList.add("ball_645");
            dataItem.classList.add("lrg");
            temp = Math.ceil(item / 10);
            ballclassname = "ball" + temp.toString();
            dataItem.classList.add(ballclassname);
            dataItem.textContent = item;
            dataRow.appendChild(dataItem);
        }
        dataContainer.appendChild(dataRow);
    }
}

function initDisplayData() {
    const myhash = [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]];
    //const hashResultElement = document.getElementById('hash-result');
    //hashResultElement.textContent = `SHA-256 해싱 결과: ${hashResult} 그리고: ${myhash}`;
    const dataContainer = document.getElementById('data-container');
    while (dataContainer.firstChild) {
        dataContainer.removeChild(dataContainer.firstChild);
    }
    var ballclassname = "";
    var temp = 0;
    for (const rowData of myhash) {
        const dataRow = document.createElement('div');
        dataRow.classList.add('num');
        for (const item of rowData) {
            const dataItem = document.createElement("span");
            dataItem.classList.add("ball_645");
            dataItem.classList.add("lrg");
            temp = Math.ceil(item / 10);
            ballclassname = "ball" + temp.toString();
            dataItem.classList.add(ballclassname);
            dataItem.textContent = item;
            dataRow.appendChild(dataItem);
        }
        dataContainer.appendChild(dataRow);
    }
}

// Initial display setting
document.getElementById('imageUploadSection').style.display = 'block';
initDisplayData();
