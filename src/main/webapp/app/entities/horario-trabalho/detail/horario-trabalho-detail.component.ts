import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHorarioTrabalho } from '../horario-trabalho.model';

@Component({
  selector: 'jhi-horario-trabalho-detail',
  templateUrl: './horario-trabalho-detail.component.html',
})
export class HorarioTrabalhoDetailComponent implements OnInit {
  horarioTrabalho: IHorarioTrabalho | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horarioTrabalho }) => {
      this.horarioTrabalho = horarioTrabalho;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
