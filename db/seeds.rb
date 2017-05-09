javascript = Language.create(name: 'javascript')
puts 'Language created!'

example = javascript.build_example({
	setup: "var lenguageFavorito = '';",
	answer: "// javascript es el lenguaje favorito\n// asignalo a la variable lenguageFavorito\nvar lenguajeFavorito = 'javascript';",
	fixture: "Test.expect(lenguajeFavorito.length > 0, 'La cadena esta vacia')\nTest.expect(lenguajeFavorito === 'javascript', 'El lenguaje favorito no es javascript')\n"
})
example.save
puts 'Example created!'



['fundamentos', 'algoritmos', 'refactorizacion', 'bugs'].each do |category|
	Category.create(name: category)
end
puts 'Categories created!'

description = <<~HEREDOC
La funcion numeroDeOcurrencias debe regresar el número de ocurrencias de un elemento en un arreglo.

```javascript
var arr = [0,1,2,2,3];
arr.numeroDeOcurrencias(0) === 1;
arr.numeroDeOcurrencias(4) === 0;
arr.numeroDeOcurrencias(2) === 2;
arr.numeroDeOcurrencias("a") === 0;
```
HEREDOC

challenge = Challenge.create({
	name: 'Encuentra el numero de ocurrencias',
	rank: 1,
	description: description,
	category: 'fundamentos',
	tags: 'algoritmos,funciones,arreglos'	
})
puts 'Challenge created!'

initial_solution = "Array.prototype.numeroDeOcurrencias = function(val){\n  \n}"
final_solution   = "Array.prototype.numeroDeOcurrencias = function(val){\n  return this.filter(e => e === val).length; \n}"
example_fixture  = "var arr = [4, 0, 4, 'a'];\n\nTest.assertEquals(arr.numeroDeOcurrencias(4), 2);\nTest.assertEquals(arr.numeroDeOcurrencias(0), 1);"
final_fixture    = "var arr = [4, 0, 4, 'a'];\n\ndescribe('Numeros', function() {\n  it('Deberia aceptar numeros', function() {\n    Test.assertEquals(arr.numeroDeOcurrencias(4), 2);\n    Test.assertEquals(arr.numeroDeOcurrencias(0), 1);\n  });\n});\n\ndescribe('Letras', function() {\n  it('Deberia aceptar letras', function() {\n    Test.assertEquals(arr.numeroDeOcurrencias('a'), 1);\n  });\n});"

translation = Translation.create({
	initial_solution: initial_solution,
	complete_solution: final_solution,
	example_fixture: example_fixture,
	final_fixture: final_fixture,
	challenge_id: challenge.id,
	language_id: javascript.id
})
puts 'JavaScript translation created!'

# ------------------------------------------------------

description = <<~HEREDOC
Tu tarea es definir una funcion llamada parOImpar la cual recibe
como argumento un numero, dicha funcion debe devolver la palabra
"par" en caso de que el numero mandado sea par y la palabra "impar"
en caso de que el numero sea impar como se muestra en el siguiente ejemplo:

```js
parOImpar(1) // => "impar"
parOImpar(4) // => "par"
```
HEREDOC

challenge = Challenge.create({
	name: 'Par o Impar?',
	rank: 1,
	description: description,
	category: 'fundamentos',
	tags: 'condiciones,control de flujo,operadores'	
})
puts 'Challenge created!'

initial_solution = "function parOImpar(numero) {\n  \n}"
final_solution   = "function parOImpar(numero) {\n  return numero % 2 == 0 ? 'par' : 'impar';\n}"
example_fixture  = "Test.assertEquals(parOImpar(1), 'impar');\nTest.assertEquals(parOImpar(2), 'par');"
final_fixture    = "for(var i = 0; i < 100; i++) {\n  Test.assertEquals(parOImpar(i), i % 2 == 0 ? 'par' : 'impar');\n}"

translation = Translation.create({
	initial_solution: initial_solution,
	complete_solution: final_solution,
	example_fixture: example_fixture,
	final_fixture: final_fixture,
	status: 'beta',
	challenge_id: challenge.id,
	language_id: javascript.id
})
puts 'JavaScript translation created!'

# ------------------------------------------------------

description = <<~HEREDOC
Define una funcion que regrese la suma de dos numeros dados.

```js
suma(1, 2) // => 3
suma(-1, 5) // => 4
suma(0, 0) // => 0
```
HEREDOC

challenge = Challenge.create({
	name: 'Suma de dos números',
	rank: 1,
	description: description,
	category: 'fundamentos',
	tags: 'operadores,números,funciones'	
})
puts 'Challenge created!'

initial_solution = "function suma(a, b) {\n  return a + b;\n}"
final_solution   = "function suma(a, b) {\n  \n}"
example_fixture  = "Test.assertEquals(suma(1, 2), 3);\nTest.assertEquals(suma(-1, 5), 4);\nTest.assertEquals(suma(0, 0), 0);"
final_fixture    = "function getRandomInt(min, max) {\n  return Math.floor(Math.random() * (max - min)) + min;\n}\n\nfor(var i = 0; i < 100; i++) {\n	let a = getRandomInt(0, 1000);\n  	let b = getRandomInt(0, 1000);\n  	Test.assertEquals(suma(a, b), a + b);\n}"

translation = Translation.create({
	initial_solution: initial_solution,
	complete_solution: final_solution,
	example_fixture: example_fixture,
	final_fixture: final_fixture,
	status: 'beta',
	challenge_id: challenge.id,
	language_id: javascript.id
})
puts 'JavaScript translation created!'