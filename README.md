<p align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

<h1 align="center">📁 Local Drive Manager</h1>

<p align="center">
  <strong>A Google Drive–inspired file management system built with React and Node.js</strong>
</p>

<p align="center">
  <a href="https://youtu.be/0AclArlpRnA">📺 Watch Demo on YouTube</a>
</p>

---

## 🌟 Overview

**Local Drive Manager** is a full-stack file management application that brings the power of cloud storage to your local machine. With an intuitive drag-and-drop interface, nested folder support, and real-time upload progress tracking, managing your files has never been easier.

---

## ✨ Features

### 📂 File & Folder Management
| Feature | Description |
|---------|-------------|
| **📤 File Upload** | Upload files via button click or drag-and-drop |
| **📁 Folder Creation** | Create new folders with custom names |
| **📂 Nested Folders** | Navigate through unlimited folder hierarchy |
| **✏️ Rename** | Rename files and folders inline with extension preservation |
| **🗑️ Delete** | Delete files and folders with confirmation dialog |

### 🎨 User Experience
| Feature | Description |
|---------|-------------|
| **🖱️ Drag & Drop** | Visual overlay when dragging files onto the window |
| **📊 Progress Bar** | Real-time upload progress with percentage display |
| **🔍 Search/Filter** | Instantly filter files and folders by name |
| **🍞 Breadcrumb Navigation** | Easy navigation through folder structure |
| **👁️ Open in New Tab** | Preview files directly in browser |
| **⬇️ Download** | Download files with proper headers |

### 📏 Storage Management
| Feature | Description |
|---------|-------------|
| **💾 Storage Stats** | View used vs total storage (10 GB default limit) |
| **📁 Folder Size** | Recursive folder size calculation |
| **📈 Usage Percentage** | Visual storage usage indicator |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19.1.0** | UI Library |
| **React Router DOM 7.7** | Client-Side Routing |
| **Vite 7.0** | Build Tool & Dev Server |
| **TailwindCSS 4.1** | Utility-First CSS Framework |
| **Lucide React** | Beautiful Icon Library |
| **Gilroy Font** | Custom Typography |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime Environment |
| **Express 4.21** | Web Framework |
| **Nodemon** | Development Auto-Restart |
| **Native FS APIs** | File System Operations |

---

## 📁 Project Structure

| Path | Description |
|------|-------------|
| **client/** | React Frontend Application |
| **client/src/components/** | Reusable UI Components |
| **client/src/App.jsx** | Router Configuration |
| **client/src/DirectoryView.jsx** | Main Directory Component |
| **server/** | Express Backend API |
| **server/server.js** | API Endpoints |
| **server/storage/** | File Storage Directory |

### 📦 Components
| Component | Description |
|-----------|-------------|
| **Header.jsx** | App header with storage info display |
| **ControlBar.jsx** | Upload button, filter input, new folder controls |
| **FileTable.jsx** | Table displaying all files and folders |
| **FileRow.jsx** | Individual file/folder row with actions |
| **ProgressBar.jsx** | Upload progress indicator |
| **Breadcrumb.jsx** | Folder navigation breadcrumbs |
| **DropOverlay.jsx** | Drag & drop visual overlay |

---

## 🚀 Getting Started

### Prerequisites  
- **Node.js** 18.x or higher
- **npm** or **yarn**

### Installation Steps

1. **Clone the repository**
2. **Install Backend** - Navigate to server folder and run `npm install`
3. **Install Frontend** - Navigate to client folder and run `npm install`

### Running the Application

1. **Start Backend** - In server folder, run `npm run dev` (runs on port 3000)
2. **Start Frontend** - In client folder, run `npm run dev` (runs on port 5173)

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/directory/:path*` | List directory contents with file sizes |
| **POST** | `/directory/:path*` | Create new folder at specified path |
| **GET** | `/files/:path*` | Get/Open file in browser |
| **POST** | `/files/:path*` | Upload file using streaming |
| **PATCH** | `/files/:path*` | Rename file or folder |
| **DELETE** | `/files/:path*` | Delete file or folder recursively |
| **GET** | `/storage/stats` | Get storage usage statistics |

### Query Parameters
| Parameter | Description |
|-----------|-------------|
| `?action=download` | Force file download with attachment header |
| `?action=open` | Open file in browser (default behavior) |

---

## 📋 Key Features Explained

### 🖱️ Drag and Drop Upload
The application listens for drag events on the main container. When files are dragged over the window, a visual overlay appears indicating the drop zone. Dropping files triggers an immediate upload with progress tracking.

### 📊 Real-Time Upload Progress
File uploads use XMLHttpRequest with progress event listeners. The progress percentage is calculated from loaded/total bytes and displayed on an animated progress bar that auto-hides after completion.

### 📁 Recursive Folder Size Calculation
The server calculates folder sizes by recursively traversing all nested files and directories, summing up their individual sizes to provide accurate storage metrics.

### ✏️ Smart Rename with Extension Preservation
When renaming files, the application automatically preserves the original file extension. Users only edit the filename portion, preventing accidental extension changes that could break files.

### 🔍 Real-Time File Filtering
The filter input provides instant search functionality. As users type, the file table dynamically filters to show only matching files and folders by name.

---

## ⚙️ Configuration

| Setting | Location | Default |
|---------|----------|---------|
| **Storage Limit** | server/server.js | 10 GB |
| **API Base URL** | client/src/DirectoryView.jsx | localhost:3000 |
| **Server Port** | server/server.js | 3000 |
| **Client Port** | client/vite.config.js | 5173 |

---

## 📜 Available Scripts

### Client Scripts
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run lint` | Run ESLint for code quality |
| `npm run preview` | Preview production build locally |

### Server Scripts
| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start with nodemon (auto-restart on changes) |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 👨‍💻 Author

**Arnav Prajapati**

📺 [YouTube Demo](https://youtu.be/0AclArlpRnA) | 💼 [GitHub](https://github.com/arnavprajapati)

---

<p align="center">
  Made with ❤️ using React & Node.js
</p>
