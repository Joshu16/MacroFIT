function showDetails(supplement) {
    document.querySelector('.Suplements').style.display = 'none';
    document.getElementById('details').style.display = 'block';
    document.querySelectorAll('.detail-content').forEach(content => {
        if (content.id === supplement) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

function hideDetails() {
    document.querySelector('.Suplements').style.display = 'grid';
    document.getElementById('details').style.display = 'none';
}
