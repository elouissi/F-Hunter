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
  username: string | null = null;

  constructor(private flowbiteService: FlowbiteService,private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  getUsername(): string {
    console.log(this.authService.getUsername());
    return <string>this.authService.getUsername();
  }




  logout() {
    return this.authService.logout();

  }
}
