import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {Router} from '@angular/router';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  constructor(private router:Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.navigate(['init']);
  }
}
