# angular-component

  # Installation

  ng generate component edit

  edit.ts

      import { Component } from '@angular/core';

      @Component({
        selector: 'app-edit',
        imports: [],
        templateUrl: './edit.html',
        styleUrl: './edit.css'
      })
      export class Edit {

      }


  Utilisation dans app.ts

    import { Component } from '@angular/core';
    import { RouterModule } from '@angular/router';
    import { Edit } from './edit/edit';

    @Component({
      imports: [
        Edit,
        RouterModule
      ],
      selector: 'app-root',
      templateUrl: './app.html',
      styleUrl: './app.css',
    })
    export class App {
      protected title = 'angular-component';
    }


  # Theories

    Le component est une class avec un export
    Utilisation dans un autre compoenent via Import

    @Component est un décorateur TypeScript fourni par Angular, utilisé pour définir un composant.
    comme une annotation dans java
    Ce décorateur dispose de propriétés


    Liste des proprétés
    
    selector	            string	          Nom de la balise HTML personnalisée du composant
    templateUrl	          string	          Chemin vers le fichier HTML externe
    template	            string	          Template inline (alternative à templateUrl)
    styleUrls	            string[]	        Chemins vers un ou plusieurs fichiers CSS/SCSS externes
    styles	              string[]	        Styles inline (alternative à styleUrls)
    standalone	          boolean	          Définit si le composant est standalone (sans NgModule)
    imports	              any[]	            Composants / modules à importer (si standalone: true)
    providers	            Provider[]	      Injection de dépendances spécifique à ce composant
    encapsulation	        ViewEncapsulation	Contrôle de l’encapsulation CSS

# Component de type standalone
  Depuis la version Angular 14

# Par defaut les component sont de type standalone
  Depuis la version Angular 19