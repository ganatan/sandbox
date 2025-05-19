import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PersonService } from './person.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  name = 'ridley-scott'
  biography = ''

  constructor(private personService: PersonService) { }

  loadBiography() {
    console.log('00000000001:');
    this.personService.getBiography(this.name).subscribe(
      data => {
        console.log('00000000001:' + JSON.stringify(data));
        this.biography = data
      }
    )
  }
}
