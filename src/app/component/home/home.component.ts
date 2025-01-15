import { Component, OnInit } from '@angular/core';
import { CompetitionService, Competition } from '../../services/competition/competition.service';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ParticipationService} from "../../services/participation/participation.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [

    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  competitions: Competition[] = [];
  isLoading: boolean = true;
  searchTerm: any;
  userCin: string | null = '';
  participationScore: number = 0;

  constructor(private competitionService: CompetitionService, private participationService: ParticipationService,private authService:AuthService,) {
  }

  ngOnInit(): void {
    this.fetchCompetitions();
  }

  fetchCompetitions(): void {
    this.isLoading = true;
    this.competitionService.getCompetitions().subscribe({
      next: (data) => {
        this.competitions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching competitions:', err);
        this.isLoading = false;
      }
    });
  }

  filterCompetitions() {

  }

  participateInCompetition(competitionCode: string): void {
    this.userCin = this.authService.getCin();
    if (!this.userCin) {
      alert('Please enter your CIN first');
      return;
    }

    const participationData = {
      cin: this.userCin,
      competitionCode: competitionCode,
      score: this.participationScore
    };

    this.participationService.participate(participationData).subscribe({
      next: (response) => {
        alert('Successfully registered for the competition!');
        this.fetchCompetitions();
      },
      error: (error) => {
        alert('Error registering for competition: ' + error);
      }
    });
  }
}
