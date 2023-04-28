
  

  const selectPais = document.querySelector("#paises");
  const formulario = document.querySelector("#formulario");
  const ciudadInput = document.querySelector("#ciudad");
  


  const resultadoClima = document.querySelector("#resultado");
   
   
  let pais;
  let nomPais;

  selectPais.addEventListener("change",(event)=>{

        pais =  event.target.value ;
        let opcionSeleccionada = selectPais.selectedIndex;
        nomPais =  event.target[opcionSeleccionada].text;
     
  });


  formulario.addEventListener("submit",(event)=>{
        event.preventDefault();
        if(ciudadInput.value.trim() === '' || pais === ''){
            mostrarAlerta("Todos los campos son obligatorios","error");
        }else{
            let ciudad = ciudadInput.value;
            let apiKey = '9362dc455d1e4949746f8d8e85ddb51d';
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

            fetch(url)
               .then(respuesta => respuesta.json())
               .then(spinner())
               .then(datos => mostrarDatos(datos,ciudad))               
        }    
       
  });
  
  function spinner(){
    resultadoClima.innerHTML = `<div class="sk-fading-circle">
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    </div>`;

  }
  
  function mostrarDatos(datos,ciudad){
          
          const {cod} = datos;   

          if(cod===200){

             mostrarAlerta("Obteniendo información","correcto");
             setTimeout(()=>{
                const {coord:{lon,lat},main:{temp,temp_min,temp_max}} = datos;

                let ciudadFormateada = ciudad.toLowerCase().charAt(0).toUpperCase() + ciudad.toLowerCase().slice(1);
   
   
                resultadoClima.innerHTML = `
   
                         <div id="caja-resul">
                             <h3 id="nomPais">${nomPais}</h3>
                             <h4 id="nomCiudad">Clima en ${ciudadFormateada}</h4>
                             <h5 id="temp">${Math.round(temp - 273.15)}°C</h5>
                                  <div class="flex-temperatura">
                                         <span>Max: ${Math.round(temp_max - 273.15)}°C</span>
                                         <span>Min: ${Math.round(temp_min - 273.15)}°C</span>
                                  </div>
   
                                  <div class="flex-localizacion">
                                         <span>Latitud: ${lat} </span>
                                         <span>Longitud: ${lon}</span>
                                  </div>
                         </div>               
                `   
             },1000)
            
             formulario.reset();

          }
          else{
            setTimeout(() => {
                resultadoClima.innerHTML = `<p>Ciudad no encontrada , vuelve a elegir una ciudad.</p>`;
                mostrarAlerta("Ciudad no encontrada","error");
            }, 2000);
          }
  
  }


  function mostrarAlerta(mensaje,tipo){
        
       let parrafo = document.createElement("p");

        if(tipo === 'error'){
              parrafo.classList.add("error");
              parrafo.textContent = mensaje;
              formulario.appendChild(parrafo);
        }

        if(tipo==='correcto'){
              parrafo.classList.add("success");
              parrafo.textContent = mensaje;
              formulario.appendChild(parrafo);
        }

        setTimeout(() => {
              parrafo.remove();
        },1500);

  }
  