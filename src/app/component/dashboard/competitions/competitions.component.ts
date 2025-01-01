import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Compétitions</h2>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let competition of competitions">
            <td class="px-6 py-4 whitespace-nowrap">{{ competition.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ competition.date | date }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button class="text-indigo-600 hover:text-indigo-900 mr-2">Éditer</button>
              <button class="text-red-600 hover:text-red-900">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class CompetitionsComponent implements OnInit {
  competitions = [
    { id: 1, name: 'Compétition 1', date: new Date('2023-06-01') },
    { id: 2, name: 'Compétition 2', date: new Date('2023-07-15') },
  ];

  ngOnInit() {
    // Ici, vous pouvez appeler votre service pour récupérer les données depuis l'API Spring Boot
  }
}

