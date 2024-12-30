import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FlowbiteService } from "../../services/flowbite.service";
import {AuthService} from "../../services/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private flowbiteService: FlowbiteService,private authService: AuthService) {}


  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    return this.authService.logout();
  }
}
