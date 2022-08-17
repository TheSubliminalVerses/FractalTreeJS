declare module 'vector' {
    global {
        function fromRadians(rad: number): number
        function toRadians(deg: number): number
        function draw2DVector(vectorA: Vector, vectorB: Vector, color: Color): void
        function draw2DVector(vectorA: Vector, vectorB: Vector, color: string | number): void
    }
}