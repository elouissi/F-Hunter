import { Component, OnInit } from '@angular/core';
import { CompetitionService, Competition } from '../../services/competition.service';
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [

    NgForOf,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  competitions: Competition[] = [];
  isLoading: boolean = true; // Indique si les données sont en cours de chargement

  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.fetchCompetitions();
  }

  fetchCompetitions(): void {
    this.isLoading = true; // Active le spinner
    this.competitionService.getCompetitions().subscribe({
      next: (data) => {
        this.competitions = data;
        this.isLoading = false; // Désactive le spinner une fois les données chargées
      },
      error: (err) => {
        console.error('Error fetching competitions:', err);
        this.isLoading = false; // Désactive le spinner en cas d'erreur
      }
    });
  }
}
