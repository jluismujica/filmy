# 🎬 Filmy - Blog de Cine & Crítica Visual

Filmy es un sitio web y blog cinematográfico de alto impacto gráfico, desarrollado en **TypeScript**, **Next.js (App Router)** y **Tailwind CSS**, diseñado específicamente para desplegarse sin configuración en **Vercel**.

## ✨ Características Principales

- **Header Cinematográfico & Menú de Géneros**:
  - Filtro dinámico e interactivo por géneros (*Bélico / Acción*, *Drama*, *Ciencia Ficción*, *Suspenso / Thriller*, *Crimen*).
  - Barra de búsqueda instantánea con contraste óptimo.
  - Navegación fluida.
- **Zona de Despliegue Altamente Gráfica**:
  - Fondo blanco puro (`bg-white`) para maximizar la legibilidad y destacar el arte visual.
  - **Efecto Parallax 3D & Hover Dinámico**: Las tarjetas responden a la posición del cursor con inclinación tridimensional, reflejo de luz dinámico (*glare*) y zoom en las imágenes de portada.
  - **Sombra Vistosa (*Card Shadow*)**: Efecto de elevación cinematográfica multicapa (`card-shadow-cinematic`).
- **Cards Completas**:
  - Imagen de alta calidad.
  - Título principal y subtítulo analítico.
  - Evaluación 1-5 estrellas con badge numérico.
  - Fecha de creación del artículo.
  - Autor con foto y rol editorial.
  - Duración y año de estreno.
- **Despliegue del Artículo (Modal / Lector)**:
  - Al hacer clic en cualquier tarjeta, se despliega el artículo con análisis escena por escena, citas memorables, fotografía, dirección, highlights y veredicto con puntuación final.
- **Footer Celeste Predominante**:
  - Diseñado con la paleta celeste característica de la identidad visual de Filmy.
  - Alto contraste garantizado (tipografías blancas y celestes de alta luminosidad que cumplen estándares WCAG).
  - Incluye enlaces de géneros, manifiesto cinéfilo, suscripción a newsletter y badge de Vercel.
- **Artículo de Prueba Incluido**:
  - Análisis completo de **"Bastardos sin Gloria"** (*Inglourious Basterds* de Quentin Tarantino), con evaluación 5/5, desglose del prólogo de Hans Landa, el cine como revólver de Shosanna y la escena de la taberna subterránea.
  - Entradas adicionales para enriquecer el catálogo (*Blade Runner 2049*, *Oppenheimer*, *El Padrino*, *Parásitos*).

---

## 🚀 Despliegue en Vercel

Dado que ya tienes tu cuenta de Vercel activa, puedes desplegar de dos formas muy sencillas:

### Opción 1: Mediante la CLI de Vercel en la terminal
```bash
# 1. Inicia sesión en tu cuenta de Vercel si tu token requiere renovación
vercel login

# 2. Despliega en modo producción
vercel --prod
```

### Opción 2: Vinculando con GitHub / GitLab / Bitbucket
1. Sube este repositorio a tu cuenta de GitHub:
   ```bash
   git remote add origin https://github.com/tu-usuario/filmy.git
   git push -u origin main
   ```
2. En [vercel.com/new](https://vercel.com/new), selecciona el repositorio e importa.
3. Vercel detectará automáticamente Next.js y realizará el despliegue en segundos.

---

## 🛠️ Ejecución Local

Para probarlo localmente en tu máquina:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
