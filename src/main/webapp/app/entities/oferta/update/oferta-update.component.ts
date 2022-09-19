import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { OfertaFormService, OfertaFormGroup } from './oferta-form.service';
import { IOferta } from '../oferta.model';
import { OfertaService } from '../service/oferta.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IPlano } from 'app/entities/plano/plano.model';
import { PlanoService } from 'app/entities/plano/service/plano.service';

@Component({
  selector: 'jhi-oferta-update',
  templateUrl: './oferta-update.component.html',
})
export class OfertaUpdateComponent implements OnInit {
  isSaving = false;
  oferta: IOferta | null = null;

  usuariosSharedCollection: IUsuario[] = [];
  planosSharedCollection: IPlano[] = [];

  editForm: OfertaFormGroup = this.ofertaFormService.createOfertaFormGroup();

  constructor(
    protected ofertaService: OfertaService,
    protected ofertaFormService: OfertaFormService,
    protected usuarioService: UsuarioService,
    protected planoService: PlanoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  comparePlano = (o1: IPlano | null, o2: IPlano | null): boolean => this.planoService.comparePlano(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oferta }) => {
      this.oferta = oferta;
      if (oferta) {
        this.updateForm(oferta);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const oferta = this.ofertaFormService.getOferta(this.editForm);
    if (oferta.id !== null) {
      this.subscribeToSaveResponse(this.ofertaService.update(oferta));
    } else {
      this.subscribeToSaveResponse(this.ofertaService.create(oferta));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOferta>>): void {
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

  protected updateForm(oferta: IOferta): void {
    this.oferta = oferta;
    this.ofertaFormService.resetForm(this.editForm, oferta);

    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      oferta.usuarioCriador
    );
    this.planosSharedCollection = this.planoService.addPlanoToCollectionIfMissing<IPlano>(this.planosSharedCollection, oferta.plano);
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.oferta?.usuarioCriador))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));

    this.planoService
      .query()
      .pipe(map((res: HttpResponse<IPlano[]>) => res.body ?? []))
      .pipe(map((planos: IPlano[]) => this.planoService.addPlanoToCollectionIfMissing<IPlano>(planos, this.oferta?.plano)))
      .subscribe((planos: IPlano[]) => (this.planosSharedCollection = planos));
  }
}
