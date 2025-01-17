import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FlowbiteService } from "../../services/utils/flowbite.service";
import {AuthService} from "../../services/auth/auth.service";
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

  get username(): string | null {
    return this.authService.getUsername();
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    return this.authService.logout();

  }
}
