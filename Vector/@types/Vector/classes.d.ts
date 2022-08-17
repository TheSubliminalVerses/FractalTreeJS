declare module 'vector' {
    global {
        class Vector {
            public x: number
            public y: number

            constructor(x?: number, y?: number)

            add(other: Vector): void
            sub(other: Vector): void
            div(other: Vector): void
            mulByScalar(scalar: number): void
            mulByVector(other: Vector): void
            rotateDeg(deg: number): void
            rotateRad(rad: number): void
            heading(options?: {angleUnits: string}): number
            getMagnitudeSq(): number
            getMagnitude(): number
            setAngleDeg(deg: number): void
            setAngleRad(rad: number): void
            toString(): string
            copy(): Vector
        }

        class Vector3D {
            public x: number
            public y: number
            public z: number

            constructor(x?: number, y?: number, z?: number)
            
            add(other: Vector3D): void
            sub(other: Vector3D): void
            div(other: Vector3D): void
            mulByScalar(scalar: number): void
            mulByVector(other: Vector3D): void
            getMagnitudeSq(): number
            getMagnitude(): number
            getXYMagnitudeSq(): number
            getXYMagnitude(): number
            heading(options?: AngleOptions): Vector3DDirection
        }

        class Color {
            public r: number
            public g: number
            public b: number

            constructor(r: number, g: number, b: number)
        }
    }
}