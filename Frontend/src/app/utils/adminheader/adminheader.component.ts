import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClienteService } from 'src/app/cliente/services/cliente.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
  standalone: true,
  imports: [RouterLink],
})
export class AdminheaderComponent {
  router = inject(Router);

  constructor(private service: ClienteService, private cookie: CookieService) {}
  irGestionRoles() {
    this.router.navigateByUrl('/gestionRoles');
  }

  cerrarSesion() {
    this.service.cerrarSesion().subscribe({
      next: (response: any) => {
        console.log('cerrando sesion');
        this.cookie.delete('token');
        this.cookie.delete('token2');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
