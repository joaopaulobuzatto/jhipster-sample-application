import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoDeDocumentoAnexavel } from '../tipo-de-documento-anexavel.model';

@Component({
  selector: 'jhi-tipo-de-documento-anexavel-detail',
  templateUrl: './tipo-de-documento-anexavel-detail.component.html',
})
export class TipoDeDocumentoAnexavelDetailComponent implements OnInit {
  tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDeDocumentoAnexavel }) => {
      this.tipoDeDocumentoAnexavel = tipoDeDocumentoAnexavel;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
