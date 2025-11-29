// Selecciona todas las pestañas (botones) y todos los paneles
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

/*
 Función activarTab(tabElement):
 - recibe el botón (tab) que se activó
 - desactiva todas las tabs y oculta todos los paneles
 - activa la tab recibida y muestra su panel correspondiente
*/
function activarTab(tabElement) {
  // 1) Desactivar todas las pestañas y esconder paneles
  tabs.forEach(t => {
    t.classList.remove('active');           // quita estilo visual activo
    t.setAttribute('aria-selected', 'false'); // accesibilidad
  });

  panels.forEach(p => {
    p.classList.add('hidden');              // añade la clase que oculta
    p.setAttribute('hidden', '');           // atributo hidden (para screen readers)
  });

  // 2) Activar la pestaña clickeada
  tabElement.classList.add('active');
  tabElement.setAttribute('aria-selected', 'true');

  // 3) Mostrar el panel asociado: data-tab => id "panel-N"
  const tabIndex = tabElement.dataset.tab;   // p.ej. "1"
  const panel = document.getElementById(`panel-${tabIndex}`);
  if (panel) {
    panel.classList.remove('hidden');
    panel.removeAttribute('hidden');
  }
}

/* Añadimos listeners para click en cada tab */
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    activarTab(tab);
  });

  /* Soporte básico de teclado: flechas izquierda/derecha */
  tab.addEventListener('keydown', (e) => {
    const KEY_LEFT = 37, KEY_RIGHT = 39, KEY_HOME = 36, KEY_END = 35;
    let newIndex;

    const currentIndex = Array.from(tabs).indexOf(tab);

    if (e.keyCode === KEY_LEFT) {
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      tabs[newIndex].focus();
    } else if (e.keyCode === KEY_RIGHT) {
      newIndex = (currentIndex + 1) % tabs.length;
      tabs[newIndex].focus();
    } else if (e.keyCode === KEY_HOME) {
      tabs[0].focus();
    } else if (e.keyCode === KEY_END) {
      tabs[tabs.length - 1].focus();
    }
  });
});

/* Al cargar la página, aseguramos que la primera pestaña esté activa (defecto) */
document.addEventListener('DOMContentLoaded', () => {
  const primera = document.querySelector('.tab');
  if (primera) activarTab(primera);
});
