import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UsuarioIpLiberadoFormService, UsuarioIpLiberadoFormGroup } from './usuario-ip-liberado-form.service';
import { IUsuarioIpLiberado } from '../usuario-ip-liberado.model';
import { UsuarioIpLiberadoService } from '../service/usuario-ip-liberado.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IIpLiberado } from 'app/entities/ip-liberado/ip-liberado.model';
import { IpLiberadoService } from 'app/entities/ip-liberado/service/ip-liberado.service';

@Component({
  selector: 'jhi-usuario-ip-liberado-update',
  templateUrl: './usuario-ip-liberado-update.component.html',
})
export class UsuarioIpLiberadoUpdateComponent implements OnInit {
  isSaving = false;
  usuarioIpLiberado: IUsuarioIpLiberado | null = null;

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];
  ipLiberadosSharedCollection: IIpLiberado[] = [];

  editForm: UsuarioIpLiberadoFormGroup = this.usuarioIpLiberadoFormService.createUsuarioIpLiberadoFormGroup();

  constructor(
    protected usuarioIpLiberadoService: UsuarioIpLiberadoService,
    protected usuarioIpLiberadoFormService: UsuarioIpLiberadoFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected ipLiberadoService: IpLiberadoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  compareIpLiberado = (o1: IIpLiberado | null, o2: IIpLiberado | null): boolean => this.ipLiberadoService.compareIpLiberado(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarioIpLiberado }) => {
      this.usuarioIpLiberado = usuarioIpLiberado;
      if (usuarioIpLiberado) {
        this.updateForm(usuarioIpLiberado);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuarioIpLiberado = this.usuarioIpLiberadoFormService.getUsuarioIpLiberado(this.editForm);
    if (usuarioIpLiberado.id !== null) {
      this.subscribeToSaveResponse(this.usuarioIpLiberadoService.update(usuarioIpLiberado));
    } else {
      this.subscribeToSaveResponse(this.usuarioIpLiberadoService.create(usuarioIpLiberado));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioIpLiberado>>): void {
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

  protected updateForm(usuarioIpLiberado: IUsuarioIpLiberado): void {
    this.usuarioIpLiberado = usuarioIpLiberado;
    this.usuarioIpLiberadoFormService.resetForm(this.editForm, usuarioIpLiberado);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      usuarioIpLiberado.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      usuarioIpLiberado.usuario
    );
    this.ipLiberadosSharedCollection = this.ipLiberadoService.addIpLiberadoToCollectionIfMissing<IIpLiberado>(
      this.ipLiberadosSharedCollection,
      usuarioIpLiberado.ipLiberado
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) =>
          this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.usuarioIpLiberado?.licenca)
        )
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.usuarioIpLiberado?.usuario)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));

    this.ipLiberadoService
      .query()
      .pipe(map((res: HttpResponse<IIpLiberado[]>) => res.body ?? []))
      .pipe(
        map((ipLiberados: IIpLiberado[]) =>
          this.ipLiberadoService.addIpLiberadoToCollectionIfMissing<IIpLiberado>(ipLiberados, this.usuarioIpLiberado?.ipLiberado)
        )
      )
      .subscribe((ipLiberados: IIpLiberado[]) => (this.ipLiberadosSharedCollection = ipLiberados));
  }
}
