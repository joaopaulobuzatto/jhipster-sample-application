import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrigem } from '../origem.model';

@Component({
  selector: 'jhi-origem-detail',
  templateUrl: './origem-detail.component.html',
})
export class OrigemDetailComponent implements OnInit {
  origem: IOrigem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ origem }) => {
      this.origem = origem;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
