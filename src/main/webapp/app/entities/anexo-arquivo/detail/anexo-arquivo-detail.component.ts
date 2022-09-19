import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnexoArquivo } from '../anexo-arquivo.model';

@Component({
  selector: 'jhi-anexo-arquivo-detail',
  templateUrl: './anexo-arquivo-detail.component.html',
})
export class AnexoArquivoDetailComponent implements OnInit {
  anexoArquivo: IAnexoArquivo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anexoArquivo }) => {
      this.anexoArquivo = anexoArquivo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
