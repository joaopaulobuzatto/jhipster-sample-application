import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { GrupoPermissoesFormService, GrupoPermissoesFormGroup } from './grupo-permissoes-form.service';
import { IGrupoPermissoes } from '../grupo-permissoes.model';
import { GrupoPermissoesService } from '../service/grupo-permissoes.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-grupo-permissoes-update',
  templateUrl: './grupo-permissoes-update.component.html',
})
export class GrupoPermissoesUpdateComponent implements OnInit {
  isSaving = false;
  grupoPermissoes: IGrupoPermissoes | null = null;

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm: GrupoPermissoesFormGroup = this.grupoPermissoesFormService.createGrupoPermissoesFormGroup();

  constructor(
    protected grupoPermissoesService: GrupoPermissoesService,
    protected grupoPermissoesFormService: GrupoPermissoesFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoPermissoes }) => {
      this.grupoPermissoes = grupoPermissoes;
      if (grupoPermissoes) {
        this.updateForm(grupoPermissoes);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grupoPermissoes = this.grupoPermissoesFormService.getGrupoPermissoes(this.editForm);
    if (grupoPermissoes.id !== null) {
      this.subscribeToSaveResponse(this.grupoPermissoesService.update(grupoPermissoes));
    } else {
      this.subscribeToSaveResponse(this.grupoPermissoesService.create(grupoPermissoes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupoPermissoes>>): void {
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

  protected updateForm(grupoPermissoes: IGrupoPermissoes): void {
    this.grupoPermissoes = grupoPermissoes;
    this.grupoPermissoesFormService.resetForm(this.editForm, grupoPermissoes);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      grupoPermissoes.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      grupoPermissoes.usuarioCriador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) =>
          this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.grupoPermissoes?.licenca)
        )
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.grupoPermissoes?.usuarioCriador)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}