import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICor } from '../cor.model';

@Component({
  selector: 'jhi-cor-detail',
  templateUrl: './cor-detail.component.html',
})
export class CorDetailComponent implements OnInit {
  cor: ICor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cor }) => {
      this.cor = cor;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
