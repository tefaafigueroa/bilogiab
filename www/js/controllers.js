angular.module('starter.controllers', [])

.controller('AdnCtrl', function($scope) {})

.controller('DashCtrl', function($scope) {})

.controller('TablaCtrl', function($scope) {})

.controller('infografiaCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
$(document).ready(function(){
  
var checkArray = []; // para verificar si las dos cartas con click son el mismo personaje
var idArray = []; //array para guardar los ids de las cartas que tienen click 
var contador = 0;
var fin = 0; 
var fields = document.querySelectorAll(".atras");


var images = [
"http://libbys.es/wordpress/wp-content/uploads/2014/12/vitamina-c-web.jpg",
"http://libbys.es/wordpress/wp-content/uploads/2014/12/vitamina-c-web.jpg",
"https://frutas-con.com/wp-content/uploads/2017/10/frutas-con-vitamina-c.jpg",
"https://frutas-con.com/wp-content/uploads/2017/10/frutas-con-vitamina-c.jpg",
"https://i2.wp.com/www.healthyforkful.com/wp-content/uploads/2018/11/heart-1480779_640.png?fit=579%2C640&ssl=1",
"https://i2.wp.com/www.healthyforkful.com/wp-content/uploads/2018/11/heart-1480779_640.png?fit=579%2C640&ssl=1",
"https://image.freepik.com/vector-gratis/infografia-sobre-vitaminas-frutas-verduras_23-2147592004.jpg",
"https://image.freepik.com/vector-gratis/infografia-sobre-vitaminas-frutas-verduras_23-2147592004.jpg",
"hhttp://canalsaludybelleza.com/wp-content/uploads/2015/02/Viamina-C_02-Copiar.jpg",
"http://canalsaludybelleza.com/wp-content/uploads/2015/02/Viamina-C_02-Copiar.jpg",
"https://www.hola.com/imagenes/estar-bien/20180716127026/estas-son-las-frutas-que-necesitas-segun-las-vitaminas-que-te-faltan-cs/0-584-513/platano-z.jpg",
"https://www.hola.com/imagenes/estar-bien/20180716127026/estas-son-las-frutas-que-necesitas-segun-las-vitaminas-que-te-faltan-cs/0-584-513/platano-z.jpg",
"https://previews.123rf.com/images/kulyk/kulyk1507/kulyk150700018/44033450-las-vitaminas-y-los-minerales-de-la-fruta-de-banano-infograf%C3%ADa-sobre-los-nutrientes-en-el-banano-ilust.jpg",
"https://previews.123rf.com/images/kulyk/kulyk1507/kulyk150700018/44033450-las-vitaminas-y-los-minerales-de-la-fruta-de-banano-infograf%C3%ADa-sobre-los-nutrientes-en-el-banano-ilust.jpg",
"https://t2.uc.ltmcdn.com/images/1/4/2/frutas_y_verduras_con_vitamina_e_49241_600.jpg",
"https://t2.uc.ltmcdn.com/images/1/4/2/frutas_y_verduras_con_vitamina_e_49241_600.jpg",
"https://www.ecured.cu/images/thumb/5/51/Vitaminas_y_Frutas01.jpeg/200px-Vitaminas_y_Frutas01.jpeg",
"https://www.ecured.cu/images/thumb/5/51/Vitaminas_y_Frutas01.jpeg/200px-Vitaminas_y_Frutas01.jpeg"
];
// verificacion de los clicks
function clicked() { 
  if ($(this).find(".inner-wrap").hasClass("flipped")) {
    return;
  }
  $(this).find(".inner-wrap").toggleClass("flipped");
  checkArray.push($(this).find("img").attr("src"));
  idArray.push($(this).attr("id"));
  check();
}

$(".carta").on("click", clicked);
  
//reiniciar el juego
function reiniciar() {
  $(".atras").find("img").remove(); //quitar todas las imagenes actuales
  $(".carta .inner-wrap").removeClass("flipped"); // quitar la classe flipped para volver a su estado inicial
  checkArray = []; 
  idArray = [];
  contador = 0; 
  fin = 0;
  iniciarJuego();
}
//para verificar el fin del juego
function verificarFin() {
  if (fin === 18) { //si todas las cartas estan volteadas
    alert("Juego finalizado, lo has logrado en " + contador + " intentos");
    reiniciar();
  }
}
//para random de las imagenes 
function shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function iniciarJuego() {

  

  var arr = shuffleArray(images); //array con las imagenes de forma aleatoria
 // append de las imagenes a la clase para la parte de atras de las cartas
  for (var i = 0; i < fields.length; i++) {
    var img = document.createElement("img");
    img.src = arr[i];
    fields[i].appendChild(img);
  }


}

function check() {
  //si los fields se  han hecho dos clicks 
  if (checkArray.length === 2) {
    $(".carta").off("click", clicked); 
    setTimeout(function(){
      //si no hay match
      if (checkArray[0] !== checkArray[1]) { 
        //voltear las dos cartas seleccionadas
        $("#" + idArray[0]).find(".inner-wrap").removeClass("flipped"); 
        $("#" + idArray[1]).find(".inner-wrap").removeClass("flipped"); 
        contador++;
        //vaciar los arrays para la siguiente eleccion
        checkArray = []; 
        idArray = []; 
        //habilitar el click de nuevo
        $(".carta").on("click", clicked);
      } else {

        contador++;
        
        fin += 2; // contador para el final del juego, se agregan dos para el contador de fin
        //vaciar los dos arrays
        checkArray = []; 
        idArray = []; 
        verificarFin(); 
        $(".carta").on("click", clicked); 
      }
      document.querySelector(".counter").innerHTML = contador;
    }, 800);  
  }
}



iniciarJuego();

});