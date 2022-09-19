import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFeriado } from '../feriado.model';

@Component({
  selector: 'jhi-feriado-detail',
  templateUrl: './feriado-detail.component.html',
})
export class FeriadoDetailComponent implements OnInit {
  feriado: IFeriado | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feriado }) => {
      this.feriado = feriado;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
