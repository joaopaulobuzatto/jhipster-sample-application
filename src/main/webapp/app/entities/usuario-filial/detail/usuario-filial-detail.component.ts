import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioFilial } from '../usuario-filial.model';

@Component({
  selector: 'jhi-usuario-filial-detail',
  templateUrl: './usuario-filial-detail.component.html',
})
export class UsuarioFilialDetailComponent implements OnInit {
  usuarioFilial: IUsuarioFilial | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarioFilial }) => {
      this.usuarioFilial = usuarioFilial;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
