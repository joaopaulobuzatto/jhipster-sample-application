import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PessoaJuridicaFormService, PessoaJuridicaFormGroup } from './pessoa-juridica-form.service';
import { IPessoaJuridica } from '../pessoa-juridica.model';
import { PessoaJuridicaService } from '../service/pessoa-juridica.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';

@Component({
  selector: 'jhi-pessoa-juridica-update',
  templateUrl: './pessoa-juridica-update.component.html',
})
export class PessoaJuridicaUpdateComponent implements OnInit {
  isSaving = false;
  pessoaJuridica: IPessoaJuridica | null = null;

  licencasSharedCollection: ILicenca[] = [];

  editForm: PessoaJuridicaFormGroup = this.pessoaJuridicaFormService.createPessoaJuridicaFormGroup();

  constructor(
    protected pessoaJuridicaService: PessoaJuridicaService,
    protected pessoaJuridicaFormService: PessoaJuridicaFormService,
    protected licencaService: LicencaService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoaJuridica }) => {
      this.pessoaJuridica = pessoaJuridica;
      if (pessoaJuridica) {
        this.updateForm(pessoaJuridica);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoaJuridica = this.pessoaJuridicaFormService.getPessoaJuridica(this.editForm);
    if (pessoaJuridica.id !== null) {
      this.subscribeToSaveResponse(this.pessoaJuridicaService.update(pessoaJuridica));
    } else {
      this.subscribeToSaveResponse(this.pessoaJuridicaService.create(pessoaJuridica));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoaJuridica>>): void {
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

  protected updateForm(pessoaJuridica: IPessoaJuridica): void {
    this.pessoaJuridica = pessoaJuridica;
    this.pessoaJuridicaFormService.resetForm(this.editForm, pessoaJuridica);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      pessoaJuridica.pessoaJuridicaLicenca
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) =>
          this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.pessoaJuridica?.pessoaJuridicaLicenca)
        )
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));
  }
}
