import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioGrupoPermissoes } from '../usuario-grupo-permissoes.model';

@Component({
  selector: 'jhi-usuario-grupo-permissoes-detail',
  templateUrl: './usuario-grupo-permissoes-detail.component.html',
})
export class UsuarioGrupoPermissoesDetailComponent implements OnInit {
  usuarioGrupoPermissoes: IUsuarioGrupoPermissoes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarioGrupoPermissoes }) => {
      this.usuarioGrupoPermissoes = usuarioGrupoPermissoes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
