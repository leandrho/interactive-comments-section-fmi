export interface Renderable{
     element: HTMLElement;
     render(): HTMLElement;
     prepare(): void;

     // load(): boolean;
     // save(): boolean;
}