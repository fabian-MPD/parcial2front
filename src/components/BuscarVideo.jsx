
import { Link } from "react-router-dom";
import "./styles/UserHome.css";
import { useState, useEffect } from "react";
import axios from "axios";

function BuscarVideo() {
    const [videos, setVideos] = useState([]); // Todos los videos
    const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
    const [filteredVideos, setFilteredVideos] = useState([]); // Videos filtrados

    // Obtener todos los videos al cargar el componente
    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await axios.get(`http://localhost:4000/v1/signos/videos`);
                setVideos(response.data); // Guardar todos los videos obtenidos
                console.log(videos)
            } catch (error) {
                console.error("Error al obtener los videos:", error);
            }
        }
        fetchVideos();
    }, []);

    // Filtrar videos por nombre al cambiar el término de búsqueda
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredVideos([]); // Si no hay término, no mostrar resultados
        } else {
            const results = videos.filter((video) =>
                video.filename.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredVideos(results);
        }
    }, [searchTerm, videos]);

    return (
        <div>
            {/* Barra de menú superior */}
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/userHome">Subir video</Link>
                    </li>
                    <li>
                        <Link to="/buscarVideo">Buscar Video</Link>
                    </li>
                </ul>
            </nav>

            <h2>Buscar Videos</h2>

            {/* Input para buscar videos */}
            <input
                type="text"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    display: "block",
                    margin: "10px auto",
                    padding: "10px",
                    width: "90%",
                    maxWidth: "400px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            />

            {/* Sección de Videos Encontrados */}
            {searchTerm && (
                <>
                    <h2>Videos Encontrados</h2>
                    <div className="video-list">
                        {filteredVideos.length > 0 ? (
                            filteredVideos.map((video, index) => (
                                <div key={index} className="video-item">
                                    <video controls width="400">
                                        <source src={video.url} type="video/mp4" />
                                        Tu navegador no soporta reproducción de video.
                                    </video>
                                    <p>{video.filename}</p>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron videos con ese nombre.</p>
                        )}
                    </div>
                </>
            )}

            {/* Sección de Videos Subidos */}
            <h2>Todos los Videos Subidos</h2>
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

export default BuscarVideo;
