// Cria um objeto XMLHttpRequest
let xhttp = new XMLHttpRequest();

// Define a função a ser chamada quando a requisição for concluída
xhttp.onreadystatechange = function () {
    // Verifica se a requisição foi concluída com sucesso
    if (this.readyState == 4 && this.status == 200) {
        // Converte o resultado para um objeto JavaScript
        let jsonData = JSON.parse(this.responseText);
        // Armazena o objeto JSON no localStorage
        localStorage.setItem('dadosJson', JSON.stringify(jsonData));
    }
};

// Faz uma requisição HTTP GET para o arquivo JSON
xhttp.open('GET', 'images_dataset.json', true);
xhttp.send();

// Obtém o valor armazenado no localStorage com a chave 'dadosJson'
let dadosJson = localStorage.getItem('dadosJson');

// Verifica se o valor existe no localStorage
if (dadosJson !== null) {
    // Converte o valor de volta para um objeto JavaScript
    let jsonData = JSON.parse(dadosJson);

    //Cria a vitrine
    // Obter a referência do elemento HTML que contém as imagens
    const container = document.getElementById('container');
    jsonData.forEach(imagem => {
        const div = document.createElement('div');
        div.className = 'thumbnail';
        div.innerHTML = `<img src="${imagem.url}" alt="${imagem.descricao}">`;

        //Adicionando evento a div.thumbnail
        div.addEventListener("click", function () {
            document.getElementById("url").value = imagem.url;
            document.getElementById("imagem").src = imagem.url;
            document.getElementById("imagem").number = imagem.id;
            document.getElementById("imagem").anotacoes = imagem.anotacoes;
        });

        // Adicionar a div no container
        container.appendChild(div);
    });
    //fim da vitrine
} else {
    console.log('Não há dados armazenados no localStorage.');
}

// function criarVitrine() {
//     // Obter a referência do elemento HTML que contém as imagens
//     const container = document.getElementById('container');

//     // Carregar o arquivo JSON com as URLs das imagens
//     fetch('images_dataset.json')
//         .then(response => response.json())
//         .then(data => {
//             // Criar uma div com a classe "thumbnail" para cada imagem
//             data.forEach(imagem => {
//                 const div = document.createElement('div');
//                 div.className = 'thumbnail';
//                 div.innerHTML = `<img src="${imagem.url}" alt="${imagem.descricao}">`;

//                 //Adicionando evento a div.thumbnail
//                 div.addEventListener("click", function () {
//                     document.getElementById("url").value = imagem.url;
//                     document.getElementById("imagem").src = imagem.url;
//                     document.getElementById("imagem").number = imagem.id;
//                     document.getElementById("imagem").anotacoes = imagem.anotacoes;
//                 });

//                 // Adicionar a div no container
//                 container.appendChild(div);
//             });
//         })
//         .catch(error => {
//             console.error(error);
//         });

// }

// criarVitrine();

var myState = {};

function showMarkerArea(target) {
    const markerArea = new markerjs2.MarkerArea(target);

    //Render event --> OK/Save button
    markerArea.addEventListener("render", (event) => {
        target.src = event.dataUrl;
        console.log(target.number);
        myState[target.number] = event.state;
        console.log(JSON.stringify(myState[target.number]));
        // Salva o state no localstorage
        let jsonData = JSON.parse(dadosJson);
        let id = parseInt(target.number);
        console.log(jsonData[id].anotacoes);
        jsonData[id].anotacoes = event.state;
        // Armazena o objeto JSON no localStorage
        localStorage.setItem('dadosJson', JSON.stringify(jsonData));
        
        // Criar um método para salvar o JSON em um banco de dados.

        // Create a blog object with the file content which you want to add to the file
        const file = new Blob([JSON.stringify(jsonData)], { type: 'text/plain' });
        saveAs(file, 'images_dataset.json');

        

    });

    markerArea.show();
    if (target.anotacoes) {
        myState[target.number] = target.anotacoes;
    }

    if (myState[target.number]) {
        markerArea.restoreState(myState[target.number]);
    }


}

function carregarImagem() {
    var url = document.getElementById("url").value;
    document.getElementById("imagem").src = url;
}


// function escolherImagem() {
//     var urls = document.getElementsByClassName("thumbnail");
//     for (item = 0; item < urls.length; item++) {
//         urls[item].addEventListener("click", function () {
//             var url = this.childNodes[1].src;
//             document.getElementById("url").value = url;
//             document.getElementById("imagem").src = url;
//         })

//     }
// }

// escolherImagem();
