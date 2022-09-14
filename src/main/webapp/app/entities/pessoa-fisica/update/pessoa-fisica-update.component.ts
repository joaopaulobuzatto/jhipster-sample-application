import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PessoaFisicaFormService, PessoaFisicaFormGroup } from './pessoa-fisica-form.service';
import { IPessoaFisica } from '../pessoa-fisica.model';
import { PessoaFisicaService } from '../service/pessoa-fisica.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';

@Component({
  selector: 'jhi-pessoa-fisica-update',
  templateUrl: './pessoa-fisica-update.component.html',
})
export class PessoaFisicaUpdateComponent implements OnInit {
  isSaving = false;
  pessoaFisica: IPessoaFisica | null = null;

  licencasSharedCollection: ILicenca[] = [];

  editForm: PessoaFisicaFormGroup = this.pessoaFisicaFormService.createPessoaFisicaFormGroup();

  constructor(
    protected pessoaFisicaService: PessoaFisicaService,
    protected pessoaFisicaFormService: PessoaFisicaFormService,
    protected licencaService: LicencaService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoaFisica }) => {
      this.pessoaFisica = pessoaFisica;
      if (pessoaFisica) {
        this.updateForm(pessoaFisica);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoaFisica = this.pessoaFisicaFormService.getPessoaFisica(this.editForm);
    if (pessoaFisica.id !== null) {
      this.subscribeToSaveResponse(this.pessoaFisicaService.update(pessoaFisica));
    } else {
      this.subscribeToSaveResponse(this.pessoaFisicaService.create(pessoaFisica));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoaFisica>>): void {
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

  protected updateForm(pessoaFisica: IPessoaFisica): void {
    this.pessoaFisica = pessoaFisica;
    this.pessoaFisicaFormService.resetForm(this.editForm, pessoaFisica);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      pessoaFisica.pessoaFisicaLicenca
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) =>
          this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.pessoaFisica?.pessoaFisicaLicenca)
        )
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));
  }
}
