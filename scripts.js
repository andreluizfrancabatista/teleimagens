function criarVitrine() {
    // Obter a referência do elemento HTML que contém as imagens
    const container = document.getElementById('container');

    // Carregar o arquivo JSON com as URLs das imagens
    fetch('images_dataset.json')
        .then(response => response.json())
        .then(data => {
            // Criar uma div com a classe "thumbnail" para cada imagem
            data.forEach(imagem => {
                const div = document.createElement('div');
                div.className = 'thumbnail';
                div.innerHTML = `<img src="${imagem.url}" alt="${imagem.descricao}">`;
                

                //Adicionando evento a div.thumbnail
                div.addEventListener("click", function () {
                    document.getElementById("url").value = imagem.url;
                    document.getElementById("imagem").src = imagem.url;
                    document.getElementById("imagem").number = imagem.id;
                });


                // Adicionar a div no container
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error(error);
        });

}

criarVitrine();
var myState = {};

function showMarkerArea(target) {
    const markerArea = new markerjs2.MarkerArea(target);
    
    //Render event --> OK/Save button
    markerArea.addEventListener("render", (event) => {
        target.src = event.dataUrl;
        console.log(target.number);
        myState[target.number] = event.state;
        console.log(JSON.stringify(myState[target.number]));
    });

    markerArea.show();
    if(myState[target.number]){
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
