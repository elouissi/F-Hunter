import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  template: `
    <aside [class]="isCollapsed ? 'w-20' : 'w-80'"
           class="transition-all duration-300 bg-gray-800 text-white min-h-screen">
      <div class="p-4 flex items-center justify-between">
        <h1 [class]="isCollapsed ? 'hidden' : 'text-2xl font-semibold'">Dashboard</h1>
        <button
          (click)="toggleSidebar()"
          class="p-2 rounded-lg hover:bg-gray-700 focus:outline-none"
        >
          <svg
            [class]="isCollapsed ? 'transform rotate-180' : ''"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <nav class="mt-4">
        <a
          routerLink="/dashboard/competitions"
          routerLinkActive="bg-gray-700"
          class="flex items-center py-3 px-4 hover:bg-gray-700 transition-colors"
        >

          <img
            style=""
            alt="Competition"
            ngSrc="../../../../assets/images/competition.png"
            width="44"
            height="44"
            priority
          >

          <span [class]="isCollapsed ? 'hidden' : 'ml-3'">Compétitions</span>
        </a>
        <a
          routerLink="/dashboard/users"
          routerLinkActive="bg-gray-700"
          class="flex items-center py-3 px-4 hover:bg-gray-700 transition-colors"
        >
          <img
            style=""
            alt="users"
            ngSrc="../../../../assets/images/users.png"
            width="44"
            height="44"
            priority>
          <span [class]="isCollapsed ? 'hidden' : 'ml-3'">Utilisateurs</span>
        </a>
        <a
          routerLink="/dashboard/species"
          routerLinkActive="bg-gray-700"
          class="flex items-center py-3 px-4 hover:bg-gray-700 transition-colors"
        >
          <img
            style=""
            alt="species"
            ngSrc="../../../../assets/images/species.png"
            width="44"
            height="44"
            priority>
          <span [class]="isCollapsed ? 'hidden' : 'ml-3'">Species</span>
        </a>

      </nav>
    </aside>
  `,
})
export class SidebarComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}

