import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UsuarioGrupoPermissoesFormService, UsuarioGrupoPermissoesFormGroup } from './usuario-grupo-permissoes-form.service';
import { IUsuarioGrupoPermissoes } from '../usuario-grupo-permissoes.model';
import { UsuarioGrupoPermissoesService } from '../service/usuario-grupo-permissoes.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IGrupoPermissoes } from 'app/entities/grupo-permissoes/grupo-permissoes.model';
import { GrupoPermissoesService } from 'app/entities/grupo-permissoes/service/grupo-permissoes.service';

@Component({
  selector: 'jhi-usuario-grupo-permissoes-update',
  templateUrl: './usuario-grupo-permissoes-update.component.html',
})
export class UsuarioGrupoPermissoesUpdateComponent implements OnInit {
  isSaving = false;
  usuarioGrupoPermissoes: IUsuarioGrupoPermissoes | null = null;

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];
  grupoPermissoesSharedCollection: IGrupoPermissoes[] = [];

  editForm: UsuarioGrupoPermissoesFormGroup = this.usuarioGrupoPermissoesFormService.createUsuarioGrupoPermissoesFormGroup();

  constructor(
    protected usuarioGrupoPermissoesService: UsuarioGrupoPermissoesService,
    protected usuarioGrupoPermissoesFormService: UsuarioGrupoPermissoesFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected grupoPermissoesService: GrupoPermissoesService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  compareGrupoPermissoes = (o1: IGrupoPermissoes | null, o2: IGrupoPermissoes | null): boolean =>
    this.grupoPermissoesService.compareGrupoPermissoes(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarioGrupoPermissoes }) => {
      this.usuarioGrupoPermissoes = usuarioGrupoPermissoes;
      if (usuarioGrupoPermissoes) {
        this.updateForm(usuarioGrupoPermissoes);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuarioGrupoPermissoes = this.usuarioGrupoPermissoesFormService.getUsuarioGrupoPermissoes(this.editForm);
    if (usuarioGrupoPermissoes.id !== null) {
      this.subscribeToSaveResponse(this.usuarioGrupoPermissoesService.update(usuarioGrupoPermissoes));
    } else {
      this.subscribeToSaveResponse(this.usuarioGrupoPermissoesService.create(usuarioGrupoPermissoes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioGrupoPermissoes>>): void {
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

  protected updateForm(usuarioGrupoPermissoes: IUsuarioGrupoPermissoes): void {
    this.usuarioGrupoPermissoes = usuarioGrupoPermissoes;
    this.usuarioGrupoPermissoesFormService.resetForm(this.editForm, usuarioGrupoPermissoes);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      usuarioGrupoPermissoes.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      usuarioGrupoPermissoes.usuario
    );
    this.grupoPermissoesSharedCollection = this.grupoPermissoesService.addGrupoPermissoesToCollectionIfMissing<IGrupoPermissoes>(
      this.grupoPermissoesSharedCollection,
      usuarioGrupoPermissoes.grupoPermissoes
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) =>
          this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.usuarioGrupoPermissoes?.licenca)
        )
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.usuarioGrupoPermissoes?.usuario)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));

    this.grupoPermissoesService
      .query()
      .pipe(map((res: HttpResponse<IGrupoPermissoes[]>) => res.body ?? []))
      .pipe(
        map((grupoPermissoes: IGrupoPermissoes[]) =>
          this.grupoPermissoesService.addGrupoPermissoesToCollectionIfMissing<IGrupoPermissoes>(
            grupoPermissoes,
            this.usuarioGrupoPermissoes?.grupoPermissoes
          )
        )
      )
      .subscribe((grupoPermissoes: IGrupoPermissoes[]) => (this.grupoPermissoesSharedCollection = grupoPermissoes));
  }
}
