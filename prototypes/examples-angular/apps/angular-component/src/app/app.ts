import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Edit } from './edit/edit';
import { Label } from './label/label';

@Component({
  imports: [
    Edit,
    Label,
    RouterModule
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-component';
}
