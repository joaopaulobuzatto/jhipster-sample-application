import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IpLiberadoFormService, IpLiberadoFormGroup } from './ip-liberado-form.service';
import { IIpLiberado } from '../ip-liberado.model';
import { IpLiberadoService } from '../service/ip-liberado.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-ip-liberado-update',
  templateUrl: './ip-liberado-update.component.html',
})
export class IpLiberadoUpdateComponent implements OnInit {
  isSaving = false;
  ipLiberado: IIpLiberado | null = null;

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm: IpLiberadoFormGroup = this.ipLiberadoFormService.createIpLiberadoFormGroup();

  constructor(
    protected ipLiberadoService: IpLiberadoService,
    protected ipLiberadoFormService: IpLiberadoFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ipLiberado }) => {
      this.ipLiberado = ipLiberado;
      if (ipLiberado) {
        this.updateForm(ipLiberado);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ipLiberado = this.ipLiberadoFormService.getIpLiberado(this.editForm);
    if (ipLiberado.id !== null) {
      this.subscribeToSaveResponse(this.ipLiberadoService.update(ipLiberado));
    } else {
      this.subscribeToSaveResponse(this.ipLiberadoService.create(ipLiberado));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIpLiberado>>): void {
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

  protected updateForm(ipLiberado: IIpLiberado): void {
    this.ipLiberado = ipLiberado;
    this.ipLiberadoFormService.resetForm(this.editForm, ipLiberado);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      ipLiberado.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      ipLiberado.usuarioCriador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) => this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.ipLiberado?.licenca))
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.ipLiberado?.usuarioCriador)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
