export interface errorProps {
    status: number,
    message: string,
    stack: string,
    code: string
}

export interface errorResponse{
    error: {
        message: string,
        status: number
    }
}