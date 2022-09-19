import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrupoPermissoes } from '../grupo-permissoes.model';

@Component({
  selector: 'jhi-grupo-permissoes-detail',
  templateUrl: './grupo-permissoes-detail.component.html',
})
export class GrupoPermissoesDetailComponent implements OnInit {
  grupoPermissoes: IGrupoPermissoes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoPermissoes }) => {
      this.grupoPermissoes = grupoPermissoes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
