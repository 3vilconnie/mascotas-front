import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Form, ListGroup, Button, Spinner, Alert } from 'react-bootstrap';
import api from "../services/api";
import type { Mascota } from "../types/mascota";

export const MascotaDetailPage: React.FC = () => {
    const { id } = useParams<{ id : string }>();

    const [mascota, setMascota] = useState<Mascota | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [autor, setAutor] = useState("");
    const [contenido, setContenido] = useState("");
    const [comentarioLoading, setComentarioLoading] = useState(false);

    let status: Record<string, string> = {
        perdida : "danger",
        encontrada : "success",
        adoptada: "secondary",
        en_adopcion: "info" 
    };

    const fetchMascota = async () => {
        try{
            setLoading(true);
            setError(null);
            const response = await api.get(`/mascotas/${id}/`);
            setMascota(response.data);
        }catch(error: any){
            console.error(error);
            const errorMsg = error.response?.data?.detail || error.message || 'error desconocido.';
            setError(errorMsg);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchMascota();
    }, [id]);

    const handleComentar = async(e: React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!autor.trim() || !contenido.trim()) return;

        try {
            setComentarioLoading(true);
            await api.post(`/mascotas/${id}/comentar/`, { autor, contenido });

            setAutor('');
            setContenido('');

            await fetchMascota();
        } catch (error : any) {
            console.error(error);
            alert(error.response?.data?.detail || 'error al subir el comentario.');
        }finally{
            setComentarioLoading(false);
        }
    };

    if (loading) {
            return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
            </Container>
            );
    }

    if (error || !mascota) {
        return (
        <Container className="py-5">
            <Alert variant="danger">{error || 'Mascota no encontrada.'}</Alert>
            <Button variant="outline-secondary" as={Link as any} to="/">← Volver</Button>
        </Container>
        );
    }


    return (
        <Container className="py-2">
            <Button variant="outline-secondary" as={Link as any} to="/" className="mb-3">
                ← Volver al listado
            </Button>
            <Row className="g-4">
                <Col md={6}>
                <Card className="shadow-sm">
                    <Card.Img 
                    variant="top" 
                    src={mascota.imagen} 
                    alt="Mascota" 
                    />
                    <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Title className="h3 mb-0">Mascota #{id}</Card.Title>
                        <Badge bg={ status[mascota.estado] } text="light">{mascota.estado}</Badge>
                    </div>
                    <Card.Text>
                        {mascota.descripcion}
                    </Card.Text>
                    
                    <ListGroup variant="flush" className="my-3">
                        <ListGroup.Item><strong>Tipo:</strong> {mascota.tipo_animal}</ListGroup.Item>
                        <ListGroup.Item><strong>Raza:</strong> {mascota.raza}</ListGroup.Item>
                        <ListGroup.Item><strong>Edad:</strong> {mascota.edad}</ListGroup.Item>
                        <ListGroup.Item><strong>Tamaño:</strong> {mascota.tamano}</ListGroup.Item>
                        <ListGroup.Item><strong>Sexo:</strong> {mascota.sexo}</ListGroup.Item>
                    </ListGroup>
                    </Card.Body>
                </Card>
                </Col>

                
                <Col md={6}>
                <Card className="shadow-sm mb-4">
                    <Card.Header>
                    <h5 className="mb-0">💬 Comentarios</h5>
                    </Card.Header>
                    <Card.Body>
                    <ListGroup className="mb-4">
                        {mascota.comentarios && mascota.comentarios.length > 0 ? (
                            mascota.comentarios.map((c) => (
                                <ListGroup.Item key={c.id}>
                                    <div className="d-flex justify-content-between">
                                        <strong>{c.autor}</strong>
                                        <small className="text-muted">
                                            {new Date(c.fecha_creacion).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <p className="mb-0 text-secondary">{c.contenido}</p>
                                </ListGroup.Item>
                            ))
                        ) : (
                            <p className="text-muted mb-0 text-center">No hay comentarios.</p>
                        )}
                    </ListGroup>

                    <h6>Dejar un comentario:</h6>
                    <Form onSubmit={handleComentar}>
                        <Form.Group className="mb-2" controlId="autor">
                            <Form.Control type="text" placeholder="Tu nombre" value={autor} onChange={e=> setAutor(e.target.value)} required disabled={comentarioLoading} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="contenido">
                            <Form.Control as="textarea" rows={3} placeholder="Escribe un comentario..." value={contenido} onChange={e=> setContenido(e.target.value)} required disabled={comentarioLoading} />
                        </Form.Group>
                        <Button variant="primary" type="submit" size="sm" disabled={comentarioLoading}>
                            {comentarioLoading ? 'Enviando...' : "Enviar Comentario"}
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        
    );

};