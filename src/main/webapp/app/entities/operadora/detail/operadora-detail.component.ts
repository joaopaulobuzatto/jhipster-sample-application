import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOperadora } from '../operadora.model';

@Component({
  selector: 'jhi-operadora-detail',
  templateUrl: './operadora-detail.component.html',
})
export class OperadoraDetailComponent implements OnInit {
  operadora: IOperadora | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ operadora }) => {
      this.operadora = operadora;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
