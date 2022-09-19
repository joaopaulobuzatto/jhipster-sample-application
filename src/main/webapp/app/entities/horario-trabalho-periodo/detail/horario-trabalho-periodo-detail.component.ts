import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHorarioTrabalhoPeriodo } from '../horario-trabalho-periodo.model';

@Component({
  selector: 'jhi-horario-trabalho-periodo-detail',
  templateUrl: './horario-trabalho-periodo-detail.component.html',
})
export class HorarioTrabalhoPeriodoDetailComponent implements OnInit {
  horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horarioTrabalhoPeriodo }) => {
      this.horarioTrabalhoPeriodo = horarioTrabalhoPeriodo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
