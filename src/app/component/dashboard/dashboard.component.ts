import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <div class="flex h-screen bg-gray-100">
      <app-sidebar></app-sidebar>
      <div class="flex-1 overflow-x-hidden overflow-y-auto">
        <main class="p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
})
export class DashboardComponent {}

