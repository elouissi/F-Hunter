import {Component, OnInit} from "@angular/core";

import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Competition, CompetitionService } from "../../../services/competition/competition.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,   Validators } from "@angular/forms";
import { futureDateValidator } from "../../../services/utils/date.check";
import { futureDate } from "../../../services/utils/futureDate.service";

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './competitions.component.html'
})
export class CompetitionsComponent implements OnInit {
  competitions: Competition[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  createForm: FormGroup;

  constructor(
    private competitionService: CompetitionService,
    private fb: FormBuilder,
  ) {
    this.createForm = this.fb.group({
      code: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+_\d{4}-\d{2}-\d{2}$/)
      ]],
      location: ['', Validators.required],
      date: ['', [
        Validators.required,
        futureDate(2)
      ]],
      speciesType: ['', Validators.required],
      minParticipants: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      maxParticipants: ['', [
        Validators.required,
        Validators.max(10000)
      ]],
      openRegistration: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchAllCompetitions();
  }

  fetchAllCompetitions(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.competitionService.getCompetitions().subscribe({
      next: (data) => {
        console.log(data);
        this.competitions = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    });
  }

  addCompetition(): void {
    if (this.createForm.invalid) {
      this.errorMessage = 'Please check all form fields are valid';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.competitionService.addCompetition(this.createForm.value).subscribe({
      next: (message) => {
        alert('Competition created successfully: ' + message);
        this.createForm.reset();
        this.fetchAllCompetitions();
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  deleteCompetition(code: string): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la compétition ${code} ?`)) {
      this.isLoading = true;
      this.errorMessage = '';

      this.competitionService.deleteCompetition(code).subscribe({
        next: (message) => {
          alert('Compétition supprimée avec succès');
          this.ngOnInit();
          this.competitions.filter(competition => competition.code !== code)
        },
        error: (error) => {
          this.errorMessage = error;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
