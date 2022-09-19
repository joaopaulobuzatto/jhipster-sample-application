import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServico } from '../servico.model';

@Component({
  selector: 'jhi-servico-detail',
  templateUrl: './servico-detail.component.html',
})
export class ServicoDetailComponent implements OnInit {
  servico: IServico | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ servico }) => {
      this.servico = servico;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
