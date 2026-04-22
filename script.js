const API_URL = "http://localhost:3000/produtos";
let produtosLocal = [];

const container = document.getElementById("lista-produtos");
const modal = document.getElementById("modalProduto");
const btnOpen = document.getElementById("btnOpenModal");
const spanClose = document.querySelector(".close");
const form = document.getElementById("formProduto");
const inputBusca = document.getElementById("inputBusca");



btnOpen.onclick = () => modal.style.display = "block";
spanClose.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }


async function carregarProdutos() {
    try {
        const response = await fetch(API_URL);
        produtosLocal = await response.json();
        renderizar(produtosLocal);
    } catch (err) {
        console.error("Erro ao carregar:", err);
        container.innerHTML = "<p>Erro ao conectar com o servidor.</p>";
    }
}


function renderizar(lista) {
    container.innerHTML = "";
    lista.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <img src="${p.imagem}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/200?text=Sem+Imagem'">
                <div>
                    <p>${p.marca.toUpperCase()}</p>
                    <h3>${p.nome}</h3>
                    <p>${p.categoria}</p>
                </div>
                <p class="preco">R$ ${Number(p.preco).toFixed(2)}</p>
            </div>
        `;
    });
}


form.onsubmit = async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value,
        imagem: document.getElementById("imagem").value,
        preco: document.getElementById("preco").value,
        categoria: document.getElementById("categoria").value,
        marca: document.getElementById("marca").value
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (res.ok) {
            form.reset();
            modal.style.display = "none";
            carregarProdutos(); 
        }
    } catch (err) {
        alert("Erro ao cadastrar produto.");
    }
};


inputBusca.oninput = () => {
    const termo = inputBusca.value.toLowerCase();
    const filtrados = produtosLocal.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        p.marca.toLowerCase().includes(termo)
    );
    renderizar(filtrados);
};


carregarProdutos();