let currentSection = 'image';

function toggleUploadSection() {
    if (currentSection === 'image') {
        document.getElementById('imageUploadSection').style.display = 'none';
        document.getElementById('textUploadSection').style.display = 'block';
        document.getElementById('uploadText').style.display = 'none';
        document.getElementById('imageInput').style.display = 'none';
        document.getElementById('toggle').innerText = '전송';
        currentSection = 'text';
    } else {
        //document.getElementById('textUploadSection').style.display = 'none';
        //document.getElementById('imageUploadSection').style.display = 'block';
        uploadText();
        document.getElementById('toggle').innerText = '글쓰기';
        document.getElementById('imageInput').style.display = 'block';
        currentSection = 'image';
    }
}

function handleImage() {
    const input = document.getElementById('imageInput');
    if (input.files && input.files[0]) {
        document.getElementById('textUploadSection').style.display = 'none';
        document.getElementById('imageUploadSection').style.display = 'block';
        currentSection = 'image';
        const imageFile = input.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Image Preview" width="200">`;
        };
        reader.readAsDataURL(imageFile);

        const formData = new FormData();
        formData.append('image', imageFile);

        fetch('http://127.0.0.1:5000/upload_image', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const hashDiv = document.getElementById('imageHash');
            hashDiv.innerHTML = `SHA256 Hash: ${data.hash}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function uploadText() {
    const text = document.getElementById('textInput').value;
    fetch('http://127.0.0.1:5000/upload_text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
        .then(response => response.json())
        .then(data => {
            const hashDiv = document.getElementById('textHash');
            hashDiv.innerHTML = `SHA256 Hash: ${data.hash}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/* function uploadText() {
    const text = document.getElementById('textInput').value;
    const lines = text.split('\n');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const fontSize = 16;
    const lineHeight = fontSize * 1.2;
    canvas.width = 500;
    canvas.height = lines.length * lineHeight + 20;  // 20 pixels padding

    context.font = `${fontSize}px Arial`;
    context.fillStyle = 'black';

    lines.forEach((line, index) => {
        context.fillText(line, 10, (index + 1) * lineHeight);
    });

    const dataURL = canvas.toDataURL();
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
        const preview = document.getElementById('textPreview');
        preview.innerHTML = `<img src="${img.src}" alt="Text Preview" width="200">`;
    };

    const formData = new FormData();
    formData.append('image', dataURLtoBlob(dataURL));

    fetch('http://127.0.0.1:5000/upload_image', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const hashDiv = document.getElementById('textHash');
        hashDiv.innerHTML = `SHA256 Hash: ${data.hash}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
} */

// Initial display setting
document.getElementById('imageUploadSection').style.display = 'block';



/* let imageFile = null;
let currentSection = 'image';

function toggleUploadSection() {
    if (currentSection === 'image') {
        document.getElementById('imageUploadSection').style.display = 'none';
        document.getElementById('textUploadSection').style.display = 'block';
        currentSection = 'text';
    } else {
        document.getElementById('textUploadSection').style.display = 'none';
        document.getElementById('imageUploadSection').style.display = 'block';
        currentSection = 'image';
    }
}

function handleImage2() {
    const input = document.getElementById('imageInput');
    if (input.files && input.files[0]) {
        const imageFile = input.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Image Preview" width="200">`;
        };
        reader.readAsDataURL(imageFile);

        const formData = new FormData();
        formData.append('image', imageFile);

        fetch('http://127.0.0.1:5000/upload_image', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const hashDiv = document.getElementById('imageHash');
                hashDiv.innerHTML = `SHA256 Hash: ${data.hash}`;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function previewImage2() {
    const input = document.getElementById('imageInput');
    if (input.files && input.files[0]) {
        imageFile = input.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Image Preview" width="200">`;
        };
        reader.readAsDataURL(imageFile);
        document.getElementById('uploadImageButton').style.display = 'block';

    }
}

function uploadImage2() {
    if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        fetch('http://127.0.0.1:5000/upload_image', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const hashDiv = document.getElementById('imageHash');
                hashDiv.innerHTML = `SHA256 Hash: ${data.hash}`;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function uploadText3() {
    const text = document.getElementById('textInput').value;
    fetch('http://127.0.0.1:5000/upload_text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
        .then(response => response.json())
        .then(data => {
            const hashDiv = document.getElementById('textHash');
            hashDiv.innerHTML = `SHA256 Hash: ${data.hash}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function uploadText3() {
    const text = document.getElementById('textInput').value;
    const lines = text.split('\n');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const fontSize = 16;
    const lineHeight = fontSize * 1.2;
    canvas.width = 500;
    canvas.height = lines.length * lineHeight + 20;  // 20 pixels padding

    context.font = `${fontSize}px Arial`;
    context.fillStyle = 'black';

    lines.forEach((line, index) => {
        context.fillText(line, 10, (index + 1) * lineHeight);
    });

    const dataURL = canvas.toDataURL();
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
        const preview = document.getElementById('textPreview');
        preview.innerHTML = `<img src="${img.src}" alt="Text Preview" width="400">`;
    };

    const formData = new FormData();
    formData.append('image', dataURLtoBlob(dataURL));

    fetch('http://127.0.0.1:5000/upload_image', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            const hashDiv = document.getElementById('textHash');
            hashDiv.innerHTML = `SHA256 Hash: ${data.hash}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function dataURLtoBlob4(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
} */