import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArrCep } from '../arr-cep.model';

@Component({
  selector: 'jhi-arr-cep-detail',
  templateUrl: './arr-cep-detail.component.html',
})
export class ArrCepDetailComponent implements OnInit {
  arrCep: IArrCep | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ arrCep }) => {
      this.arrCep = arrCep;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
