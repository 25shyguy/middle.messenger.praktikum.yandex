import Block from "./Block";

export default function renderDOM(block: Block) {
    const root = document.getElementById("app");
    
    root!.innerHTML = "";
    root!.appendChild(block.getContent()!);
}
