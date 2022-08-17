declare module 'vector' {
    global {
        interface IGeometry {
            create2DVector(x?: number, y?: number): Vector
            create3DVector(x?: number, y?: number, z?: number): Vector3D
            add(vectorA: Vector, vectorB: Vector): Vector
            sub(vectorA: Vector, vectorB: Vector): Vector
            div(vectorA: Vector, VectorB: Vector): Vector | undefined
            dotProduct(vectorA: Vector, vectorB: Vector): number
            crossProduct(vectorA: Vector, vectorB: Vector): number
            getAngle(vector: Vector): number
        }

        interface AngleOptions {
            angleUnits: string
        }

        interface Vector3DDirection {
            alpha: number
            beta: number
            gamma: number
        }
    }
}