var i = 0;
var j = 0;

function loadTrack(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        console.log("error cargando")
        data.callBack(null)
    })
}

function loadImg(data){
    var img = new Image()
    if(data.extra!=null&&data.extra!=undefined){
        img.setAttribute('f',data.extra.f)
    }
    img.onload = function(){
        img.onload = null
        img.onerror = null
        data.callBack(img)
    }
    img.onerror = function(){
        img.onload = null
        img.onerror = null
        data.callBack(null)
        console.log("error loading img: "+img.src)        
    }
    img.src = data.src
}

function getE(idname){
    return document.getElementById(idname)
}

var global_data = [{
    title:'Teléfono:',
    description:'Obligatorio. Se debe registrar al menos un número de teléfono. Se pueden incluir hasta tres teléfonos.',
    audio:null,
    obligatorio:true,
    w:94,h:14,x:5,y:33
},{
    title:'Correo electrónico:',
    description:'Obligatorio. Debe diligenciarse con la estructura correcta de un e-mail. Ten en cuenta que no una verificación. La responsabilidad de ingresar una cuenta válida es de la persona que llena el formulario.',
    audio:null,
    obligatorio:true,
    w:22,h:6,x:5,y:48
},{
    title:'Tipo de sede administrativa:',
    description:'Esta parte del formulario permite indicar si la sede administrativa es: <br><br><span>Propia</span> <span>En arriendo</span> <span>En comodato</span> <span>En préstamo</span>',
    audio:null,
    obligatorio:false,
    w:40,h:10,x:5,y:89
}]

function overZona(){
    over_mp3.currentTime = 0
    over_mp3.play()
}

var global_audio = null
var animacion_card = null
var card_active = false;
var animating_card = false;

function clickZona(audio,zona){
    if(!animating_card){
        var actual_clase = zona.getAttribute('class')
        var nueva_clase = actual_clase.replace('over','clicked')
        if(!card_active){
            intro_mp3.pause()
            setCard(audio)
            zona.className = nueva_clase
        }else{
            getE('card').className = 'card-off'
            animating_card = true;
            animacion_card = setTimeout(function(){
                clearTimeout(animacion_card)
                animacion_card = null;
                animating_card = false;
    
                setCard(audio)
                zona.className = nueva_clase
            },500)
        }
    }
}

function setCard(audio){
    if(global_audio!=null){
        global_audio.pause()
    }
    getE('card-header-title').innerHTML = global_data[audio-1].title
    getE('card-body-txt').innerHTML = global_data[audio-1].description
    if(global_data[audio-1].obligatorio){
        getE('card-header-obligatorio').style.display = 'block'
    }else{
        getE('card-header-obligatorio').style.display = 'none'
    }

    getE('card').className = 'card-on'
    card_active = true;
    global_audio = global_data[audio-1].audio
    global_audio.currentTime = 0
    global_audio.play()
    click_mp3.play()

    //.formulario-row-red
}

function setZonas(){
    for(i = 0;i<global_data.length;i++){
        var div_zona = document.createElement('div')
        div_zona.className = 'formulario-zona formulario-over'
        div_zona.setAttribute('onmouseover','overZona()')
        div_zona.setAttribute('onclick','clickZona('+(i+1)+',this)')
        div_zona.style.width = global_data[i].w+'%'
        div_zona.style.height = global_data[i].h+'%'
        div_zona.style.left = global_data[i].x+'%'
        div_zona.style.top = global_data[i].y+'%'

        getE('formulario-zonas').appendChild(div_zona)
    }
}

var animacion_fondo = null;

function setFondo(img){
    var alto_real = img.height
    var ancho_real = img.width

    var nuevo_alto = window.innerHeight
    var porcentaje = (nuevo_alto*100)/alto_real
    var nuevo_ancho = (ancho_real*porcentaje)/100

    while(nuevo_ancho<window.innerWidth){
        nuevo_alto++
        porcentaje = (nuevo_alto*100)/alto_real
        nuevo_ancho = (ancho_real*porcentaje)/100
    }
        
    getE('fondo').style.width = nuevo_ancho+'px'
    getE('fondo').style.height = nuevo_alto+'px'
    getE('fondo').style.left = '50%'
    getE('fondo').style.top = '50%'

    getE('fondo').className = 'fondo-in'
    animacion_fondo = setTimeout(function(){
        clearTimeout(animacion_fondo)
        animacion_fondo = null;
        
        var width_zoom = (nuevo_ancho*150)/100
        var height_zoom = (nuevo_alto*150)/100
        
        getE('fondo').style.width = width_zoom+'px'
        getE('fondo').style.height = height_zoom+'px'
        getE('fondo').style.left = '35.20%'
        getE('fondo').style.top = '56.85%'
    
        getE('monitor').style.width = width_zoom+'px'
        getE('monitor').style.height = height_zoom+'px'
        getE('monitor').style.left = '35.20%'
        getE('monitor').style.top = '56.85%'
    
        animacion_fondo = setTimeout(function(){
            clearTimeout(animacion_fondo)
            animacion_fondo = null;
    
            getE('monitor').className = 'monitor-on'
        },2000)
    },500)
}