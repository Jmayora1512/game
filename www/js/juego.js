var app={


	inicio: function(){
		DIAMETRO_BOLA = 50;

		velocidadX=0;
		velocidadY=0;
		puntuacion=0;

		alto = document.documentElement.clientHeight;
		ancho = document.documentElement.clientWidth;
  	    var estados = { preload: preload, create: create, update: update };
		var game = new Phaser.Game(ancho, alto, Phaser.AUTO, 'game', estados);
		app.vigilaSensores();
		app.iniciaJuego();

	},

	iniciaJuego: function() {
		function preload() {
			game.physics.startSystem(Phaser.Physics.ARCADE);
			game.stage.backgroundColor = '#f27d5c';
			game.load.image('bola', 'assets/bola.png');
		}

		function create() {
			scoreText = game.add.text(16, 16, puntuacion, { fontSize: '100px', fill: '#757676' });
			bola = game.add.sprite(app.inicioX(), app.inicioY(), 'hola');		
			game.physics.arcade.enable(bola);
			bola.body.collideWorldBounds = true;
			bola.bodyonWorldBounds = new Phaser.Signal();
			bola.bodyonWorldBounds.add(app.decrementaPuntuacion, this);
		}

		function update() {
			bola.body.velocity.y = (velocidadY * 300);
			bola.body.velocity.x = (velocidadX * 300);
		}

	
	},

	decrementaPuntuacion: function() {
		puntuacion = puntuacion - 1;
		scoreText.text = puntuacion;
	},

	inicioX: function(){
		return app.numeroAliatorioHasta( ancho - DIAMETRO_BOLA );
	},

	inicioY: function(){
		return app.numeroAliatorioHasta( alto - DIAMETRO_BOLA );
	},	

	numeroAliatorioHasta: function(limite) {
		return Math.floor(Math.random() * limite);
	},

	vigilaSensores: function() {
		function onError(){
			console.log('onError!');
		}

		function onSuccess(datosAceleracion){
			app.detectaAgitacion(datosAceleracion);
			app.registraDireccion(datosAceleracion);
		}

		navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 10});
	},

	detectaAgitacion: function(datosAceleracion){ 
		var agitacionX = datosAceleracion.x > 10;
		var agitaciony = datosAceleracion.y > 10;

		if (agitacionX || agitaciony) {
			setTimeout(app.recomienza, 1000);
		}
	},

	recomienza: function() {
		document.locatation.reload(true);
	},

	registraDireccion: function(datosAceleracion) {
		velocidadX = datosAceleracion.x ;
		velocidadY = datosAceleracion.y ;
	}

};

  // app.inicio();

if ('addEventListener' in document){
	document.addEventListener('deviceready', function() {
		app.inicio();
	},false);
}




