// Load footer content
fetch('/fragments/footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('body').insertAdjacentHTML('beforeend', data);
    })
    .catch(err => console.log('Failed to load footer: ', err));
