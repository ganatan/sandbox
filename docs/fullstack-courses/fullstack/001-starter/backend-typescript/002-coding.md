
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
