# Creer un webcomponent
  
  - Definition
    custom elements ou Web Components
    Un Angular Element est un composant Angular packagé comme un Web Component, 

  - Installation
    Le component doit être de type standalone

    npm install @angular/elements


# Procedure

Element                         Rôle

@angular/elements	              Package Angular qui fournit createCustomElement()
createCustomElement()	          Convertit un @Component Angular → CustomElement
customElements.define()	        Enregistre le composant comme balise HTML native
bootstrapApplication()	        Initialise Angular avec un composant standalone
