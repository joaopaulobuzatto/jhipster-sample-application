import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioIpLiberado } from '../usuario-ip-liberado.model';

@Component({
  selector: 'jhi-usuario-ip-liberado-detail',
  templateUrl: './usuario-ip-liberado-detail.component.html',
})
export class UsuarioIpLiberadoDetailComponent implements OnInit {
  usuarioIpLiberado: IUsuarioIpLiberado | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarioIpLiberado }) => {
      this.usuarioIpLiberado = usuarioIpLiberado;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
