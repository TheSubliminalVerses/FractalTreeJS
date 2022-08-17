declare module 'index' {
    global {
        function createArray(length?: number): Branch[]
        function printTree(branchArray: Branch[]): void
        function initEvtListener(): void
    }
}