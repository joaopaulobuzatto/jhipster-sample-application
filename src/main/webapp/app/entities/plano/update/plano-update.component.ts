import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PlanoFormService, PlanoFormGroup } from './plano-form.service';
import { IPlano } from '../plano.model';
import { PlanoService } from '../service/plano.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-plano-update',
  templateUrl: './plano-update.component.html',
})
export class PlanoUpdateComponent implements OnInit {
  isSaving = false;
  plano: IPlano | null = null;

  usuariosSharedCollection: IUsuario[] = [];

  editForm: PlanoFormGroup = this.planoFormService.createPlanoFormGroup();

  constructor(
    protected planoService: PlanoService,
    protected planoFormService: PlanoFormService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plano }) => {
      this.plano = plano;
      if (plano) {
        this.updateForm(plano);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const plano = this.planoFormService.getPlano(this.editForm);
    if (plano.id !== null) {
      this.subscribeToSaveResponse(this.planoService.update(plano));
    } else {
      this.subscribeToSaveResponse(this.planoService.create(plano));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlano>>): void {
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

  protected updateForm(plano: IPlano): void {
    this.plano = plano;
    this.planoFormService.resetForm(this.editForm, plano);

    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      plano.usuarioCriador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.plano?.usuarioCriador))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
