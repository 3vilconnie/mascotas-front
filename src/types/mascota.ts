export interface ChoiceOption{
    value : string;
    label : string;
}

export interface ChoicesResponse{
    estado : ChoiceOption[];
    tipo_animal : ChoiceOption[];
    sexo : ChoiceOption[];
    tamano : ChoiceOption[];
}

export interface Comentario{
    id : number;
    mascota : number;
    autor : string;
    fecha_creacion : string;
}

export interface Mascota{
    id: number;
    nombre : string;
    descripcion : string;
    estado: "perdida" | "encontrada" | "adoptada" | "en_adopcion" | string;
    tipo_animal : string;
    edad: number | null;
    raza: string;
    sexo : string;
    tamano : string;
    fecha_creacion : string;
    fecha_actualizacion : string;
    comentarios?: Comentario[];
}