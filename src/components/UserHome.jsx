


import { Navigate, useNavigate, Link } from "react-router-dom";
import './styles/UserHome.css';
import { useState, useEffect , useRef } from "react";
import axios from 'axios';

function UserHome({ user,iduser}) {
    const home = useNavigate();

   
    
     if (user !== "user" || !user) { 
         return <Navigate to="/" />
   }
    
    const [video, setVideo] = useState(null);
    const [newName, setNewName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [message, setMessage] = useState('');

    const fileInputRef = useRef(null);
  
    const handleFileChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };
  
    const handleUpload = async (e) => {

        e.preventDefault();
        if (!video) {
            alert('Selecciona un video primero');
            return;
        }

        if (!newName.trim()) {
            alert('Especifica un nuevo nombre para el video');
            return;
        }
  
        const formData = new FormData();
        formData.append('video', video);
        formData.append('newName', newName); // Enviar el nuevo nombre al backend
  
        try {
            setUploading(true);
            const response = await axios.post(`https://parcial2back.vercel.app/v1/signos/upload/${iduser}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
  
            // setMessage(`Video subido exitosamente: ${response.data.url}`);
            // setVideos( [response.data, ...videos]);
            setVideos((prevVideos) => [ ...prevVideos, response.data[0]]);
            setVideo(null);
            //setVideos([]);
            setNewName(''); // Restablecer el nombre

            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reiniciar el input de archivo
            }
        } catch (error) {
            console.error('Error al subir el video:', error);
            setMessage('Error al subir el video');
        } finally {
            setUploading(false);
        }
    };

  
  
    return (
        <div>

             
             <nav className="navbar">
                 <ul>
                     <li>
                         <Link to="/">Home</Link>
                     </li>
                     <li>
                         <Link to="/userHome">Página Actual</Link>
                     </li>
                     <li>
                         <Link to="/buscarvideo">Buscar Video</Link>
                     </li>
                 </ul>
             </nav>

            <h2>Subir Video</h2>
            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} />
            <input 
                
                type="text" 
                placeholder="Nuevo nombre del video" 
                value={newName} 
                onChange={handleNameChange} 
            />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Subiendo...' : 'Subir Video'}
            </button>
            <p>{message}</p>

            <h2>Videos Subidos</h2>
            <div className="video-list">
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                        <div key={index} className="video-item">
                            <video controls width="400">
                                <source src={video.url} type="video/mp4" />
                                Tu navegador no soporta reproducción de video.
                            </video>
                            <p>{video.filename}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay videos disponibles.</p>
                )}
            </div>
        </div>
    );
}

export default UserHome;
 


// // import { Navigate, useNavigate } from "react-router-dom";
// // import { Link } from "react-router-dom";
// // import "./styles/UserHome.css";
// // import { useState, useEffect, useRef } from "react";
// // import axios from "axios";

// // function UserHome({ user, iduser }) {
// //     const home = useNavigate();

   
    
// //          if (user !== "user" || !user) { 
// //              return <Navigate to="/" />
// //        }
// //     const [video, setVideo] = useState(null);
// //     const [newName, setNewName] = useState("");
// //     const [uploading, setUploading] = useState(false);
// //     const [videos, setVideos] = useState([]);
// //     const [message, setMessage] = useState("");
// //     const fileInputRef = useRef(null);

// //     // Obtener videos al cargar el componente
// //     useEffect(() => {
// //         async function fetchVideos() {
// //             try {
// //                 const response = await axios.get(`http://localhost:4000/v1/signos/videos/${iduser}`);
// //                 setVideos(response.data);
// //             } catch (error) {
// //                 console.error("Error al obtener los videos:", error);
// //                 setMessage("Error al cargar los videos.");
// //             }
// //         }
// //         fetchVideos();
// //     }, [iduser]);

// //     const handleFileChange = (e) => {
// //         setVideo(e.target.files[0]);
// //     };

// //     const handleNameChange = (e) => {
// //         setNewName(e.target.value);
// //     };

// //     const handleUpload = async (e) => {
// //         e.preventDefault();
// //         if (!video) {
// //             alert("Selecciona un video primero");
// //             return;
// //         }
// //         if (!newName.trim()) {
// //             alert("Especifica un nuevo nombre para el video");
// //             return;
// //         }

// //         const formData = new FormData();
// //         formData.append("video", video);
// //         formData.append("newName", newName);

// //         try {
// //             setUploading(true);
// //             setMessage("");
// //             const response = await axios.post(
// //                 `http://localhost:4000/v1/signos/upload/${iduser}`,
// //                 formData,
// //                 { headers: { "Content-Type": "multipart/form-data" } }
// //             );
// //             setVideos((prevVideos) => [...prevVideos, response.data[0]]);
// //             setVideo(null);
// //             setNewName("");
// //             if (fileInputRef.current) {
// //                 fileInputRef.current.value = "";
// //             }
// //         } catch (error) {
// //             console.error("Error al subir el video:", error);
// //             setMessage("Error al subir el video.");
// //         } finally {
// //             setUploading(false);
// //         }
// //     };

// //     return (
// //         <div>
// //             {/* Barra de menú superior */}
// //             <nav className="navbar">
// //                 <ul>
// //                     <li>
// //                         <Link to="/">Home</Link>
// //                     </li>
// //                     <li>
// //                         <Link to="/userHome">Página Actual</Link>
// //                     </li>
// //                     <li>
// //                         <Link to="/buscarvideo">Buscar Video</Link>
// //                     </li>
// //                 </ul>
// //             </nav>

// //             <h2>Subir Video</h2>
// //             <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} />
// //             <input
// //                 type="text"
// //                 placeholder="Nuevo nombre del video"
// //                 value={newName}
// //                 onChange={handleNameChange}
// //             />
// //             <button onClick={handleUpload} disabled={uploading}>
// //                 {uploading ? "Subiendo..." : "Subir Video"}
// //             </button>
// //             <p>{message}</p>

// //             <h2>Videos Subidos</h2>
// //             <div className="video-list">
// //                 {videos.length > 0 ? (
// //                     videos.map((video, index) => (
// //                         <div key={index} className="video-item">
// //                             <video controls width="400">
// //                                 <source src={video.url} type="video/mp4" />
// //                                 Tu navegador no soporta reproducción de video.
// //                             </video>
// //                             <p>{video.filename}</p>
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <p>No hay videos disponibles.</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }

// // export default UserHome;


// import { Navigate, Link, useNavigate } from "react-router-dom";
// import "./styles/UserHome.css";
// import { useState, useRef } from "react";
// import axios from "axios";

// function UserHome({ user, iduser }) {
//   const navigate = useNavigate();
//   if (user !== "user" || !user) {
//     return <Navigate to="/" />;
//   }

//   // Estados
//   const [video, setVideo] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0); // Progreso de subida
//   const [message, setMessage] = useState("");

//   const fileInputRef = useRef(null);
//   const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB por fragmento

//   // Cambiar archivo seleccionado
//   const handleFileChange = (e) => {
//     setVideo(e.target.files[0]);
//   };

//   // Cambiar nombre del archivo
//   const handleNameChange = (e) => {
//     setNewName(e.target.value);
//   };

//   // Subir archivo por partes
//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!video) {
//       alert("Selecciona un video primero.");
//       return;
//     }
//     if (!newName.trim()) {
//       alert("Especifica un nuevo nombre para el video.");
//       return;
//     }

//     setUploading(true);
//     setProgress(0);
//     setMessage("");

//     const totalChunks = Math.ceil(video.size / CHUNK_SIZE);
//     const fileId = `${iduser}-${Date.now()}`; // ID único para el archivo

//     for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
//       const start = chunkIndex * CHUNK_SIZE;
//       const end = Math.min(video.size, start + CHUNK_SIZE);
//       const chunk = video.slice(start, end);

//       const formData = new FormData();
//       formData.append("chunk", chunk);
//       formData.append("fileId", fileId);
//       formData.append("chunkIndex", chunkIndex);
//       formData.append("totalChunks", totalChunks);
//       formData.append("newName", newName);

//       try {
//         await axios.post(
//           `http://localhost:4000/v1/signos/upload/${iduser}`,
//           formData,
//           {
//             timeout: 60000,
//             headers: { "Content-Type": "multipart/form-data" },
//             onUploadProgress: (event) => {
//               setProgress(
//                 Math.round(((chunkIndex + event.loaded / event.total) / totalChunks) * 100)
//               );
//             },
//           }
//         );
//       } catch (error) {
//         console.error("Error al subir el fragmento:", error);
//         setMessage("Error al subir el archivo. Intenta de nuevo.");
//         setUploading(false);
//         return;
//       }
//     }

//     setUploading(false);
//     setProgress(100);
//     setMessage("¡Archivo subido exitosamente!");
//     setVideo(null);
//     setNewName("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   return (
//     <div>
//       <h2>Subir Video</h2>
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="video/*"
//         onChange={handleFileChange}
//       />
//       <input
//         type="text"
//         placeholder="Nuevo nombre del video"
//         value={newName}
//         onChange={handleNameChange}
//       />
//       <button onClick={handleUpload} disabled={uploading}>
//         {uploading ? `Subiendo (${progress}%)...` : "Subir Video"}
//       </button>
//       <p>{message}</p>
//       {uploading && <progress value={progress} max="100" />}
//     </div>
//   );
// }

// export default UserHome;

