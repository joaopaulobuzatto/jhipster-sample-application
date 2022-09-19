import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIpLiberado } from '../ip-liberado.model';

@Component({
  selector: 'jhi-ip-liberado-detail',
  templateUrl: './ip-liberado-detail.component.html',
})
export class IpLiberadoDetailComponent implements OnInit {
  ipLiberado: IIpLiberado | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ipLiberado }) => {
      this.ipLiberado = ipLiberado;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
