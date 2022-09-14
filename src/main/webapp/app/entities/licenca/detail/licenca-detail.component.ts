import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILicenca } from '../licenca.model';

@Component({
  selector: 'jhi-licenca-detail',
  templateUrl: './licenca-detail.component.html',
})
export class LicencaDetailComponent implements OnInit {
  licenca: ILicenca | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ licenca }) => {
      this.licenca = licenca;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
