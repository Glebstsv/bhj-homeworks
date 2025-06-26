document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const progress = document.getElementById('progress');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];
        
        if (!file) return;
        
        const formData = new FormData();
        formData.append('file', file);
        
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total;
                progress.value = percentComplete;
            }
        });
        
        xhr.open('POST', form.action, true);
        xhr.send(formData);
    });
});