
# les types de data
  string
  number
  boolean

  null        (type object)
  undefined
  object

# les fonctions
  normale       function declaration
  anonyme       function expression
  flechee       arrow function


# Type 
  type PersonType = {
    name: string,
    age: number
  }

# Class
  class PersonClass {
  private name: string;
  private age: number;

  constructor() {
    this.name = '';
    this.age = 20;
  }
}


# Convention de nommage
  Élément	                Convention      Exemple

  type	                  PascalCase	    type UserProfile = { ... }
  interface	              PascalCase	    interface Product = { ... }
  class	                  PascalCase	    class MovieService { ... }
  enum	                  PascalCase	    enum HttpStatus { ... }
  instance (variable)	    camelCase	      const userProfile = ...
  propriété d'objet	      camelCase       user.name, order.total


# Functions utiles

Fonction	Description	

forEach()	  Exécute une fonction pour chaque élément	    arr.forEach(e => console.log(e));
map()	      Transforme chaque élément	nouveau tableau	    arr.map(e => e * 2);
filter()	  Filtre les éléments                           arr.filter(e => e > 10);
find()	    Trouve le 1er élément                         arr.find(e => e.id === 1);
some()	    Teste si au moins un élément                  arr.some(e => e > 10);
every()	    Teste si tous les éléments                    arr.every(e => e > 0);
reduce()	  Agrège tous les éléments en une seule valeur	arr.reduce((acc, e) => acc + e, 0);
sort()	    Trie les éléments                             arr.sort((a, b) => a - b);
includes()	Vérifie si une valeur                         arr.includes('Bob');
findIndex()	Trouve l’index du 1er élément                 arr.findIndex(e => e.id === 5);
indexOf()	  Trouve l’index d’une valeur                   arr.indexOf('foo');
flat()	    Aplati un tableau imbriqué                    [[1], [2, 3]].flat();
join()	    Concatène tous les éléments                   arr.join(', ');
slice()	    Retourne une portion du tableau	              arr.slice(1, 3);
splice()	  Ajoute, supprime ou remplace des éléments     arr.splice(1, 2);