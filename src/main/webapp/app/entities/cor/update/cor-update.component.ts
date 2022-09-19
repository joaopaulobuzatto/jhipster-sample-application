import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CorFormService, CorFormGroup } from './cor-form.service';
import { ICor } from '../cor.model';
import { CorService } from '../service/cor.service';

@Component({
  selector: 'jhi-cor-update',
  templateUrl: './cor-update.component.html',
})
export class CorUpdateComponent implements OnInit {
  isSaving = false;
  cor: ICor | null = null;

  editForm: CorFormGroup = this.corFormService.createCorFormGroup();

  constructor(protected corService: CorService, protected corFormService: CorFormService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cor }) => {
      this.cor = cor;
      if (cor) {
        this.updateForm(cor);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cor = this.corFormService.getCor(this.editForm);
    if (cor.id !== null) {
      this.subscribeToSaveResponse(this.corService.update(cor));
    } else {
      this.subscribeToSaveResponse(this.corService.create(cor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICor>>): void {
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

  protected updateForm(cor: ICor): void {
    this.cor = cor;
    this.corFormService.resetForm(this.editForm, cor);
  }
}
