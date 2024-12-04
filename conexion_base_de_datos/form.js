document.getElementById('submitBtn').addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const sueldo = document.getElementById('sueldo').value;

    if (nombre && apellido && sueldo) {
        try {
            const response = await fetch('form.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, apellido, sueldo })
            });

            const result = await response.json();  // Esperamos la respuesta como JSON
            document.getElementById('responseMessage').textContent = result.message;  // Mostrar el mensaje recibido

        } catch (error) {
            document.getElementById('responseMessage').textContent = 'Hubo un error al enviar el formulario.';
        }
    } else {
        document.getElementById('responseMessage').textContent = 'Por favor, completa todos los campos.';
    }
});
