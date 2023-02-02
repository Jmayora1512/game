var app={
	inicio: function(){
		function onError() {
			console.log('onError');
		}
		navigator.accelerometer.watchAccelaration(this.OnSuccess, onError, {frequency: 1000});
	},
	
	OnSuccess: function(datosAceleracion){
		app.representa(datosAceleracion.x, '#valorx');
		app.representa(datosAceleracion.y, '#valory');
		app.representa(datosAceleracion.z, '#valorz');
	},

	representa: function(dato, elementoHTML){
		redondeo = Math.round(dato * 100) / 100
		document.querySelector(elementoHTML).innerHTML= redondeo;
	}
};

  // app.inicio();

if ('addEventListener' in document){
	document.addEventListener('deviceready', function(){
		app.inicio();
	},false);
}

