import { Component } from '@angular/core';
import {Competition} from "../../../services/competition/competition.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Specie, SpecieService} from "../../../services/specie/specie.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent {
  species: Specie[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  createForm: FormGroup;

  constructor(
    private specieService: SpecieService,
    private fb: FormBuilder,
  ) {
    this.createForm = this.fb.group({
      name: [
        '',
        [
          Validators.required, // Correspond à @NotBlank
          Validators.minLength(2) // (Optionnel) Pour éviter des noms trop courts
        ]
      ],
      minimumWeight: [
        '',
        [
          Validators.required, // Correspond à @NotNull
          Validators.min(0.1) // Correspond à @Positive (poids doit être positif)
        ]
      ],
      category: [
        '',
        [Validators.required] // Correspond à @NotNull
      ],
      difficulty: [
        '',
        [Validators.required] // Correspond à @NotNull
      ],
      points: [
        '',
        [
          Validators.required, // Correspond à @NotNull
          Validators.min(1) // (Optionnel) Les points doivent être positifs (ajout logique)
        ]
      ]
    });

  }
  ngOnInit() {
    this.fetchAllSpecies();
  }
  fetchAllSpecies() {
    this.isLoading = true;
    this.errorMessage = '';
    this.specieService.getSpecies().subscribe({
      next: (data) => {
        this.species = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    });



  }
  deleteSpecie(name: string) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la specie ${name} ?`)) {
      this.isLoading = true;
      this.errorMessage = '';

    }
    this.specieService.deleteSpecie(name).subscribe({
      next: (data) => {
        alert('Compétition supprimée avec succès');
        this.species.filter(specie => specie.name !== name);
      },
      error: (error) => {
        this.errorMessage = error;
      }
    })
  }
  addSpecie(): void {
    if (this.createForm.invalid) {
      this.errorMessage = 'Please check all form fields are valid';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.specieService.addSpecie(this.createForm.value).subscribe({
      next: (message) => {
        alert('Specie created successfully: ' + message);
        this.createForm.reset();
        this.fetchAllSpecies();
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
