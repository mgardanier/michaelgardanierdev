// Load sidebar content
fetch('/fragments/sidebar.html')
    .then(response => response.text())
    .then(data => {
        const sidebarDiv = document.querySelector('.sidebar');
        sidebarDiv.innerHTML = data;
    })
    .catch(err => console.log('Failed to load sidebar: ', err));