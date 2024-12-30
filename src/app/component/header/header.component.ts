import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FlowbiteService } from "../services/flowbite.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private flowbiteService: FlowbiteService) {}
}
