import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPessoaJuridica } from '../pessoa-juridica.model';

@Component({
  selector: 'jhi-pessoa-juridica-detail',
  templateUrl: './pessoa-juridica-detail.component.html',
})
export class PessoaJuridicaDetailComponent implements OnInit {
  pessoaJuridica: IPessoaJuridica | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoaJuridica }) => {
      this.pessoaJuridica = pessoaJuridica;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
