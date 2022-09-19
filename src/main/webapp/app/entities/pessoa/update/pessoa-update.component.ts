import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PessoaFormService, PessoaFormGroup } from './pessoa-form.service';
import { IPessoa } from '../pessoa.model';
import { PessoaService } from '../service/pessoa.service';
import { IEndereco } from 'app/entities/endereco/endereco.model';
import { EnderecoService } from 'app/entities/endereco/service/endereco.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IOperadora } from 'app/entities/operadora/operadora.model';
import { OperadoraService } from 'app/entities/operadora/service/operadora.service';

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html',
})
export class PessoaUpdateComponent implements OnInit {
  isSaving = false;
  pessoa: IPessoa | null = null;

  enderecosSharedCollection: IEndereco[] = [];
  licencasSharedCollection: ILicenca[] = [];
  operadorasSharedCollection: IOperadora[] = [];

  editForm: PessoaFormGroup = this.pessoaFormService.createPessoaFormGroup();

  constructor(
    protected pessoaService: PessoaService,
    protected pessoaFormService: PessoaFormService,
    protected enderecoService: EnderecoService,
    protected licencaService: LicencaService,
    protected operadoraService: OperadoraService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEndereco = (o1: IEndereco | null, o2: IEndereco | null): boolean => this.enderecoService.compareEndereco(o1, o2);

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareOperadora = (o1: IOperadora | null, o2: IOperadora | null): boolean => this.operadoraService.compareOperadora(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.pessoa = pessoa;
      if (pessoa) {
        this.updateForm(pessoa);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoa = this.pessoaFormService.getPessoa(this.editForm);
    if (pessoa.id !== null) {
      this.subscribeToSaveResponse(this.pessoaService.update(pessoa));
    } else {
      this.subscribeToSaveResponse(this.pessoaService.create(pessoa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(pessoa: IPessoa): void {
    this.pessoa = pessoa;
    this.pessoaFormService.resetForm(this.editForm, pessoa);

    this.enderecosSharedCollection = this.enderecoService.addEnderecoToCollectionIfMissing<IEndereco>(
      this.enderecosSharedCollection,
      pessoa.endereco
    );
    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      pessoa.licenca
    );
    this.operadorasSharedCollection = this.operadoraService.addOperadoraToCollectionIfMissing<IOperadora>(
      this.operadorasSharedCollection,
      pessoa.operadoraTelefone1
    );
  }

  protected loadRelationshipsOptions(): void {
    this.enderecoService
      .query()
      .pipe(map((res: HttpResponse<IEndereco[]>) => res.body ?? []))
      .pipe(
        map((enderecos: IEndereco[]) => this.enderecoService.addEnderecoToCollectionIfMissing<IEndereco>(enderecos, this.pessoa?.endereco))
      )
      .subscribe((enderecos: IEndereco[]) => (this.enderecosSharedCollection = enderecos));

    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(map((licencas: ILicenca[]) => this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.pessoa?.licenca)))
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.operadoraService
      .query()
      .pipe(map((res: HttpResponse<IOperadora[]>) => res.body ?? []))
      .pipe(
        map((operadoras: IOperadora[]) =>
          this.operadoraService.addOperadoraToCollectionIfMissing<IOperadora>(operadoras, this.pessoa?.operadoraTelefone1)
        )
      )
      .subscribe((operadoras: IOperadora[]) => (this.operadorasSharedCollection = operadoras));
  }
}
