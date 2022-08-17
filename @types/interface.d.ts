declare module 'index' {
    global {
        interface Window {
            angle: number
            slider: any
            root: Branch
            tree: Branch[]
            inp: any

            closeSpan: HTMLElement
            aboutWindow: HTMLElement
            openAbout: HTMLElement
        }
    }
}