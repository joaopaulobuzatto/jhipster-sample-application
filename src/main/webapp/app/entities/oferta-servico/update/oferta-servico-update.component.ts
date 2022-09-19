import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { OfertaServicoFormService, OfertaServicoFormGroup } from './oferta-servico-form.service';
import { IOfertaServico } from '../oferta-servico.model';
import { OfertaServicoService } from '../service/oferta-servico.service';
import { IOferta } from 'app/entities/oferta/oferta.model';
import { OfertaService } from 'app/entities/oferta/service/oferta.service';
import { IServico } from 'app/entities/servico/servico.model';
import { ServicoService } from 'app/entities/servico/service/servico.service';

@Component({
  selector: 'jhi-oferta-servico-update',
  templateUrl: './oferta-servico-update.component.html',
})
export class OfertaServicoUpdateComponent implements OnInit {
  isSaving = false;
  ofertaServico: IOfertaServico | null = null;

  ofertasSharedCollection: IOferta[] = [];
  servicosSharedCollection: IServico[] = [];

  editForm: OfertaServicoFormGroup = this.ofertaServicoFormService.createOfertaServicoFormGroup();

  constructor(
    protected ofertaServicoService: OfertaServicoService,
    protected ofertaServicoFormService: OfertaServicoFormService,
    protected ofertaService: OfertaService,
    protected servicoService: ServicoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareOferta = (o1: IOferta | null, o2: IOferta | null): boolean => this.ofertaService.compareOferta(o1, o2);

  compareServico = (o1: IServico | null, o2: IServico | null): boolean => this.servicoService.compareServico(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ofertaServico }) => {
      this.ofertaServico = ofertaServico;
      if (ofertaServico) {
        this.updateForm(ofertaServico);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ofertaServico = this.ofertaServicoFormService.getOfertaServico(this.editForm);
    if (ofertaServico.id !== null) {
      this.subscribeToSaveResponse(this.ofertaServicoService.update(ofertaServico));
    } else {
      this.subscribeToSaveResponse(this.ofertaServicoService.create(ofertaServico));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOfertaServico>>): void {
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

  protected updateForm(ofertaServico: IOfertaServico): void {
    this.ofertaServico = ofertaServico;
    this.ofertaServicoFormService.resetForm(this.editForm, ofertaServico);

    this.ofertasSharedCollection = this.ofertaService.addOfertaToCollectionIfMissing<IOferta>(
      this.ofertasSharedCollection,
      ofertaServico.oferta
    );
    this.servicosSharedCollection = this.servicoService.addServicoToCollectionIfMissing<IServico>(
      this.servicosSharedCollection,
      ofertaServico.servico
    );
  }

  protected loadRelationshipsOptions(): void {
    this.ofertaService
      .query()
      .pipe(map((res: HttpResponse<IOferta[]>) => res.body ?? []))
      .pipe(map((ofertas: IOferta[]) => this.ofertaService.addOfertaToCollectionIfMissing<IOferta>(ofertas, this.ofertaServico?.oferta)))
      .subscribe((ofertas: IOferta[]) => (this.ofertasSharedCollection = ofertas));

    this.servicoService
      .query()
      .pipe(map((res: HttpResponse<IServico[]>) => res.body ?? []))
      .pipe(
        map((servicos: IServico[]) => this.servicoService.addServicoToCollectionIfMissing<IServico>(servicos, this.ofertaServico?.servico))
      )
      .subscribe((servicos: IServico[]) => (this.servicosSharedCollection = servicos));
  }
}
