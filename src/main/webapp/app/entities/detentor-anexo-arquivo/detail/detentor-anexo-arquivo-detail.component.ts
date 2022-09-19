import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetentorAnexoArquivo } from '../detentor-anexo-arquivo.model';

@Component({
  selector: 'jhi-detentor-anexo-arquivo-detail',
  templateUrl: './detentor-anexo-arquivo-detail.component.html',
})
export class DetentorAnexoArquivoDetailComponent implements OnInit {
  detentorAnexoArquivo: IDetentorAnexoArquivo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detentorAnexoArquivo }) => {
      this.detentorAnexoArquivo = detentorAnexoArquivo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
