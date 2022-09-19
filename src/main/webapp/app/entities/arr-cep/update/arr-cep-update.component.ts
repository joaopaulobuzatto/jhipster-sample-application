import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ArrCepFormService, ArrCepFormGroup } from './arr-cep-form.service';
import { IArrCep } from '../arr-cep.model';
import { ArrCepService } from '../service/arr-cep.service';

@Component({
  selector: 'jhi-arr-cep-update',
  templateUrl: './arr-cep-update.component.html',
})
export class ArrCepUpdateComponent implements OnInit {
  isSaving = false;
  arrCep: IArrCep | null = null;

  editForm: ArrCepFormGroup = this.arrCepFormService.createArrCepFormGroup();

  constructor(
    protected arrCepService: ArrCepService,
    protected arrCepFormService: ArrCepFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ arrCep }) => {
      this.arrCep = arrCep;
      if (arrCep) {
        this.updateForm(arrCep);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const arrCep = this.arrCepFormService.getArrCep(this.editForm);
    if (arrCep.id !== null) {
      this.subscribeToSaveResponse(this.arrCepService.update(arrCep));
    } else {
      this.subscribeToSaveResponse(this.arrCepService.create(arrCep));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArrCep>>): void {
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

  protected updateForm(arrCep: IArrCep): void {
    this.arrCep = arrCep;
    this.arrCepFormService.resetForm(this.editForm, arrCep);
  }
}
