const template = document.getElementById("card-template");
const contenedor = document.getElementById("contenedor");

const productos = [
    { titulo: "Laptop", desc: "16GB RAM", image: "img/laptop.jpg", price: 3200000 },
    { titulo: "Mouse", desc: "Inalámbrico", image: "img/mouse.jpg", price: 25000 },
    { titulo: "Teclado", desc: "Inalámbrico", image: "img/teclado.jpg", price: 40000},
    { titulo: "Disco duro", desc: "1 Tb almacenamiento", image: "img/disco duro.jpg", price: 230000 },
    { titulo: "Memoria Ram", desc: "32 gb", image: "img/memoria ram.jpg", price: 470000 }
];

productos.forEach(p => {
    const clon = template.content.cloneNode(true);
    clon.querySelector(".title").textContent = p.titulo;
    clon.querySelector(".desc").textContent = p.desc;
    clon.querySelector("img").src = p.image;
    clon.querySelector("img").title = p.desc;
    clon.querySelector(".price").textContent = p.price.toLocalString("Es-Co");
    contenedor.appendChild(clon);
});
