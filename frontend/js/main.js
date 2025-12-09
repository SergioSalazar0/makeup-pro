document.getElementById('request').addEventListener('submit', async function(e){
    e.preventDefault();

    const name = this.elements['Name'].value;
    const phone = this.elements['Phone Number'].value;
    const email = this.elements['Email'].value;
    const message = this.elements['Message'].value;

    const res = await fetch('http://localhost:3000/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message })
    });

    if(res.ok){
        alert('Mensaje enviado correctamente!');
        this.reset();
    } else {
        alert('Error al enviar mensaje.');
    }
});
