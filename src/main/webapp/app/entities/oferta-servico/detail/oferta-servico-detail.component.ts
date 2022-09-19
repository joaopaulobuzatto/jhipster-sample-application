import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOfertaServico } from '../oferta-servico.model';

@Component({
  selector: 'jhi-oferta-servico-detail',
  templateUrl: './oferta-servico-detail.component.html',
})
export class OfertaServicoDetailComponent implements OnInit {
  ofertaServico: IOfertaServico | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ofertaServico }) => {
      this.ofertaServico = ofertaServico;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
