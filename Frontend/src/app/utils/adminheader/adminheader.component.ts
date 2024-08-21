import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
  standalone: true,
  imports: [RouterLink],
})
export class AdminheaderComponent {
  router = inject(Router);

  irGestionRoles() {
    this.router.navigateByUrl('/gestionRoles');
  }
}
