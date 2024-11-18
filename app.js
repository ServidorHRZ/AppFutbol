document.addEventListener('DOMContentLoaded', () => {
    // Cargar la página inicial (juegos)
    cargarPagina('juegos');

    // Añadir event listeners a los enlaces de navegación
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            
            // Añadir clase active al enlace clickeado
            e.currentTarget.classList.add('active');
            
            // Cargar la página correspondiente
            const pagina = e.currentTarget.dataset.page;
            cargarPagina(pagina);
        });
    });
});

async function cargarPagina(pagina) {
    try {
        const respuesta = await fetch(`Secciones/${pagina}.html`);
        if (!respuesta.ok) throw new Error('Error al cargar la página');
        
        const contenido = await respuesta.text();
        const contenedor = document.getElementById('contenido');
        
        // Limpiar cualquier contenido anterior
        contenedor.innerHTML = '';
        
        // Pequeño timeout para asegurar que la animación se reinicie
        setTimeout(() => {
            contenedor.innerHTML = contenido;
            
            // Asegurarnos que el elemento .page existe antes de animar
            const pageElement = document.querySelector('.page');
            if (pageElement) {
                pageElement.style.opacity = '0';
                pageElement.style.transform = 'translateY(20px)';
                requestAnimationFrame(() => {
                    pageElement.style.animation = 'fadeIn 0.3s ease-in-out forwards';
                });
            }
        }, 50);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('contenido').innerHTML = '<p>Error al cargar el contenido</p>';
    }
} 