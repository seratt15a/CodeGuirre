/* CodeGuirre — landing
   Lo único que normalmente querrás tocar está aquí arriba. */
const WHATSAPP = "51906260386";
const MENSAJE = "Hola, vengo de tu web. Quiero una página para mi negocio.";

const WHATSAPP_URL =
  "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(MENSAJE);

/* ---- enlaza todos los botones de WhatsApp ---- */
document.querySelectorAll("[data-wa]").forEach(function (a) {
  a.href = WHATSAPP_URL;
});

/* ---- año del pie ---- */
const anio = document.getElementById("anio");
if (anio) anio.textContent = String(new Date().getFullYear());

const cabecera = document.getElementById("cabecera");
const boton = document.getElementById("hamburguesa");
const menu = document.getElementById("menu-movil");
const barra = document.getElementById("barra-wa");
const centinela = document.getElementById("centinela");
const contacto = document.getElementById("contacto");

const ALTO_CABECERA = 72;
let abierto = false;

/* ---- menú móvil ---- */
function abrirMenu(valor) {
  abierto = valor;
  boton.setAttribute("aria-expanded", String(valor));
  boton.setAttribute("aria-label", valor ? "Cerrar menú" : "Abrir menú");
  menu.hidden = !valor;
  cabecera.dataset.abierto = valor ? "si" : "no";
  document.body.style.overflow = valor ? "hidden" : "";
  recalcular();
  if (!valor) boton.focus({ preventScroll: true });
}

boton.addEventListener("click", function () {
  abrirMenu(!abierto);
});

menu.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () {
    abrirMenu(false);
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && abierto) abrirMenu(false);
});

document.addEventListener("pointerdown", function (e) {
  if (abierto && !cabecera.contains(e.target)) abrirMenu(false);
});

window.matchMedia("(min-width: 768px)").addEventListener("change", function (e) {
  if (e.matches && abierto) abrirMenu(false);
});

/* ---- cabecera y barra fija ----
   Se calcula midiendo directamente en cada scroll, con freno de
   requestAnimationFrame. Un IntersectionObserver aquí no vale: si el
   usuario salta de golpe (un enlace de ancla), el centinela pasa de estar
   debajo de la pantalla a estar encima sin cruzar ningún borde, así que
   el observador no dispara y la barra nunca aparece. */
let enCola = false;

function recalcular() {
  enCola = false;

  cabecera.dataset.scroll = window.scrollY > 20 ? "si" : "no";

  const pasadoElHero =
    centinela.getBoundingClientRect().top < ALTO_CABECERA;

  const c = contacto.getBoundingClientRect();
  const contactoVisible = c.top < window.innerHeight && c.bottom > 0;

  const mostrar = pasadoElHero && !contactoVisible && !abierto;
  barra.hidden = !mostrar;
  barra.dataset.visible = mostrar ? "si" : "no";
}

function alMoverse() {
  if (!enCola) {
    enCola = true;
    requestAnimationFrame(recalcular);
  }
}

window.addEventListener("scroll", alMoverse, { passive: true });
window.addEventListener("resize", alMoverse, { passive: true });
window.addEventListener("orientationchange", alMoverse, { passive: true });

recalcular();
