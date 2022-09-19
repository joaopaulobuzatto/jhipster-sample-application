import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAparelho } from '../aparelho.model';

@Component({
  selector: 'jhi-aparelho-detail',
  templateUrl: './aparelho-detail.component.html',
})
export class AparelhoDetailComponent implements OnInit {
  aparelho: IAparelho | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aparelho }) => {
      this.aparelho = aparelho;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
