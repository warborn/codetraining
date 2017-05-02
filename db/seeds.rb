javascript = Language.create(name: 'javascript')
puts 'Language created!'

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
	level: 1,
	description: description,
	discipline: 'fundamentals',
	tags: 'algoritmos,funciones,arreglos'	
})
puts 'Challenge created!'

initial_solution = "Array.prototype.numeroDeOcurrencias = function(val){\n  \n}"
final_solution   = "Array.prototype.numeroDeOcurrencias = function(val){\n  return this.filter(e => e === val).length; \n}"
example_fixture  = "var arr = [4, 0, 4, 'a'];\n\ndescribe('Numeros', function() {\n  it('Deberia aceptar numeros', function() {\n    Test.assertEquals(arr.numeroDeOcurrencias(4), 2);\n    Test.assertEquals(arr.numeroDeOcurrencias(0), 1);\n  });\n});\n\ndescribe('Letras', function() {\n  it('Deberia aceptar letras', function() {\n    Test.assertEquals(arr.numeroDeOcurrencias('a'), 1);\n  });\n});"
final_fixture    = example_fixture

translation = Translation.create({
	initial_solution: initial_solution,
	final_solution: final_solution,
	example_fixture: example_fixture,
	final_fixture: final_fixture,
	status: 'beta',
	challenge_id: challenge.id,
	language_id: javascript.id
})
puts 'JavaScript translation created!'

