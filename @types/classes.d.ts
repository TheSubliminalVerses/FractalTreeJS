declare module 'index' {
    global {
        class Branch {
            public begin: Vector
            public end: Vector
            public finished: boolean
            public weight: number

            constructor(start: Vector, end: Vector)

            drawBranch(color: string | number): void
            branch(orientation: string): Branch
        }
    }
}