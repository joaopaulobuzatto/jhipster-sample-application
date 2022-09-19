import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { OperadoraFormService, OperadoraFormGroup } from './operadora-form.service';
import { IOperadora } from '../operadora.model';
import { OperadoraService } from '../service/operadora.service';

@Component({
  selector: 'jhi-operadora-update',
  templateUrl: './operadora-update.component.html',
})
export class OperadoraUpdateComponent implements OnInit {
  isSaving = false;
  operadora: IOperadora | null = null;

  editForm: OperadoraFormGroup = this.operadoraFormService.createOperadoraFormGroup();

  constructor(
    protected operadoraService: OperadoraService,
    protected operadoraFormService: OperadoraFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ operadora }) => {
      this.operadora = operadora;
      if (operadora) {
        this.updateForm(operadora);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const operadora = this.operadoraFormService.getOperadora(this.editForm);
    if (operadora.id !== null) {
      this.subscribeToSaveResponse(this.operadoraService.update(operadora));
    } else {
      this.subscribeToSaveResponse(this.operadoraService.create(operadora));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOperadora>>): void {
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

  protected updateForm(operadora: IOperadora): void {
    this.operadora = operadora;
    this.operadoraFormService.resetForm(this.editForm, operadora);
  }
}
