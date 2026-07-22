import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';
import type { Mascota } from "../types/mascota";

export const MascotasListPage: React.FC = () => {
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMascotas = async()=>{
        try{
            setLoading(true);
            setError(null);
            const response = await api.get('/mascotas/');
            setMascotas(response.data);
        }catch(err: any){
            console.error(err);
            const errorMsg = err.response?.data?.detail || err.message || "error desconocido.";
            setError(errorMsg);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchMascotas();
    }, []);

    return (
        <Container className="py-2">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Mascotas registradas</h2>
                <Button variant="primary" href="/crear">
                    + Registrar Mascota
                </Button>
            </div>

            {loading && (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
            )}

            {error && (
                <Alert variant="danger">
                    Error: {error}
                </Alert>
            )}

            {!loading && !error && (
                <>
                {mascotas.length === 0 ? (
                    <Alert variant="info">No hay mascotas registradas actualmente.</Alert>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                    {mascotas.map((mascota) => (
                        <Col key={mascota.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Img 
                            variant="top" 
                            src={mascota.imagen} 
                            alt={`Foto de ${mascota.nombre}`}
                            style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                            <Card.Title className="text-capitalize">{mascota.nombre}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted text-capitalize">
                                {mascota.tipo_animal} • {mascota.estado}
                            </Card.Subtitle>
                            <Card.Text className="text-truncate">
                                {mascota.descripcion}
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer className="bg-transparent border-top-0 pb-3">
                            <Button 
                                variant="outline-primary" 
                                as={Link as any} 
                                to={`/mascotas/${mascota.id}`} 
                                className="w-100"
                            >
                                Ver Detalle
                            </Button>
                            </Card.Footer>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                )}
                </>
            )}
        </Container>
    );
};