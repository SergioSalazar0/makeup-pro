# 💄 Makeup Pro - Sistema de Gestión de Servicios de Maquillaje

**Elevator Pitch:**  
Rápido, confiable y creativo; Mekeup Pro es una aplicación que facilita el trabajo de la persona profesionista y brinda comodidad a la clienta. La app permite enviar el maletín de maquillaje con todo lo necesario según la solicitud de la clienta, mostrando colores, labiales y tipos de maquillaje predefinidos, además de permitir comentarios y especificar alergias o preferencias.  

---

## 📋 Descripción del Proyecto

Mekeup Pro busca resolver problemas comunes en servicios de maquillaje a domicilio o en áreas sin acceso a electricidad:

- Asegura que la profesional lleve el material exacto que la clienta desea.  
- Permite a la clienta especificar marcas, tonos y posibles alergias.  
- Facilita la comunicación entre clienta y profesional.  
- Mejora la confiabilidad y eficiencia del servicio a domicilio.  

**Problema que se soluciona:**  
Muchas veces las profesionales olvidan traer algún producto o desconocen las preferencias de la clienta. Esto genera incomodidad y pérdida de confianza. Mekeup Pro optimiza el proceso, asegurando que todo el material requerido esté listo y organizado.  

**Motivo del proyecto:**  
Detectamos la necesidad de un sistema práctico que permita organizar los servicios de maquillaje a domicilio, considerando preferencias, alergias y eficiencia en la preparación del material.

---

## 🛠️ Tecnologías Utilizadas

**Backend**
- FastAPI - Framework web rápido y moderno  
- PostgreSQL - Base de datos relacional  
- SQLAlchemy - ORM para Python  
- Pydantic - Validación de datos  
- Uvicorn - Servidor ASGI  

**Frontend**
- React 19 - Librería de UI  
- TypeScript - Tipado estático  
- Vite - Build tool y dev server  
- CSS3 - Estilos modernos  

---

## 📁 Estructura del Proyecto

mekeup-pro/
├── backend/
│ ├── main.py # Punto de entrada
│ ├── config.py # Configuración global
│ ├── requirements.txt # Dependencias Python
│ ├── .env.example # Ejemplo de variables de entorno
│ ├── database/
│ │ ├── estructura.sql # Script SQL para crear tablas
│ │ ├── connection.py # Conexión a la DB
│ │ └── models.py # Modelos SQLAlchemy
│ ├── schemas/
│ │ └── product.py # Esquemas Pydantic
│ ├── crud/
│ │ └── product.py # Operaciones CRUD
│ └── routes/
│ └── products.py # Endpoints de la API
│
├── frontend/
│ ├── src/
│ │ ├── App.tsx # Componente principal
│ │ ├── config/api.ts # Configuración de API
│ │ ├── types/product.ts # Tipos TypeScript
│ │ ├── services/productService.ts # Servicio de API
│ │ └── components/
│ │ ├── ProductForm.tsx
│ │ ├── ProductList.tsx
│ │ ├── ConfirmModal.tsx
│ │ └── Notification.tsx
│ ├── package.json
│ ├── vite.config.ts
│ └── .env.example
└── README.md

yaml
Copy code

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Python 3.11+  
- Node.js 18+  
- PostgreSQL 14+  
- npm o yarn  

### 1️⃣ Configurar Base de Datos
```sql
CREATE DATABASE mekeup_pro;
Ejecuta el script backend/database/estructura.sql en tu cliente PostgreSQL.

2️⃣ Configurar Backend
bash
Copy code
cd backend
python -m venv venv
# Activar entorno virtual
# Windows PowerShell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
Edita .env con tus datos:

ini
Copy code
DATABASE_URL=postgresql://usuario:password@localhost:5432/mekeup_pro
ALLOWED_ORIGINS=http://localhost:5173
HOST=0.0.0.0
PORT=8000
RELOAD=true
Inicia el servidor:

bash
Copy code
.\start.ps1
# O manualmente
$env:DATABASE_URL="postgresql://usuario:password@localhost:5432/mekeup_pro"
$env:ALLOWED_ORIGINS="*"
& ".\venv\Scripts\python.exe" -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
Accede a la API en: http://localhost:8000/docs

3️⃣ Configurar Frontend
bash
Copy code
cd frontend
npm install
Copy-Item .env.example .env
Edita .env:

ini
Copy code
VITE_API_BASE_URL=http://127.0.0.1:8000
Inicia el frontend:

bash
Copy code
npm run dev
Disponible en: http://localhost:5173

📡 API Endpoints
Método	Endpoint	Descripción
GET	/api/v1/products/	Obtener todos los productos
GET	/api/v1/products/{id}	Obtener un producto por ID
POST	/api/v1/products/	Crear un nuevo producto
PUT	/api/v1/products/{id}	Actualizar un producto
DELETE	/api/v1/products/{id}	Eliminar un producto

Ejemplo POST:

json
Copy code
{
  "name": "Labial Nude",
  "price": 450.00,
  "is_offer": true
}
🔧 Scripts Útiles
Backend

bash
Copy code
pip install -r requirements.txt
python main.py
uvicorn main:app --reload
pytest
Frontend

bash
Copy code
npm install
npm run dev
npm run build
npm run preview
npm run lint
🔐 Variables de Entorno
Backend (.env)

ini
Copy code
DATABASE_URL=postgresql://usuario:password@host:puerto/nombre_db
ALLOWED_ORIGINS=http://localhost:5173,https://tu-app.vercel.app
HOST=0.0.0.0
PORT=8000
RELOAD=true
Frontend (.env)

ini
Copy code
VITE_API_BASE_URL=http://127.0.0.1:8000
🎯 Características
Backend

Arquitectura modular

Validación con Pydantic

ORM con SQLAlchemy

Documentación Swagger

Preparado para deploy en Railway

Frontend

Componentes React reutilizables

TypeScript

Modal de confirmación

Diseño responsive

Notificaciones para feedback

Preparado para Vercel

🐛 Solución de Problemas
Error de conexión DB: Verifica PostgreSQL y las credenciales

Error CORS: Configura ALLOWED_ORIGINS

Frontend no conecta: Verifica VITE_API_BASE_URL y la consola

📄 Licencia
MIT License. Consulta LICENSE para más detalles.

👥 Contribuciones
Fork del proyecto

Crear rama feature: git checkout -b feature/NuevaFuncionalidad

Commit: git commit -m 'Add NuevaFuncionalidad'

Push: git push origin feature/NuevaFuncionalidad

Abrir Pull Request

📞 Contacto
Si tienes preguntas o sugerencias, abre un issue en GitHub.

Desarrollado con ☕ usando FastAPI y React + TypeScript

yaml
Copy code
