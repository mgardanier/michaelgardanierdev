// Load footer content
fetch('/fragments/footer.html')
    .then(response => response.text())
    .then(data => {
        const footerDiv = document.querySelector('body');
        footerDiv.insertAdjacentHTML('beforeend', data);
        const footer = document.querySelector('footer');
        if (window.innerWidth < 768) {
            footer.style.position = 'sticky';
        }
    })
    .catch(err => console.log('Failed to load footer: ', err));