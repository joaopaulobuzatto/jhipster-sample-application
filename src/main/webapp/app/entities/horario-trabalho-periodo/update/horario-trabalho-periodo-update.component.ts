import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HorarioTrabalhoPeriodoFormService, HorarioTrabalhoPeriodoFormGroup } from './horario-trabalho-periodo-form.service';
import { IHorarioTrabalhoPeriodo } from '../horario-trabalho-periodo.model';
import { HorarioTrabalhoPeriodoService } from '../service/horario-trabalho-periodo.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IHorarioTrabalho } from 'app/entities/horario-trabalho/horario-trabalho.model';
import { HorarioTrabalhoService } from 'app/entities/horario-trabalho/service/horario-trabalho.service';

@Component({
  selector: 'jhi-horario-trabalho-periodo-update',
  templateUrl: './horario-trabalho-periodo-update.component.html',
})
export class HorarioTrabalhoPeriodoUpdateComponent implements OnInit {
  isSaving = false;
  horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo | null = null;

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];
  horarioTrabalhosSharedCollection: IHorarioTrabalho[] = [];

  editForm: HorarioTrabalhoPeriodoFormGroup = this.horarioTrabalhoPeriodoFormService.createHorarioTrabalhoPeriodoFormGroup();

  constructor(
    protected horarioTrabalhoPeriodoService: HorarioTrabalhoPeriodoService,
    protected horarioTrabalhoPeriodoFormService: HorarioTrabalhoPeriodoFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected horarioTrabalhoService: HorarioTrabalhoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  compareHorarioTrabalho = (o1: IHorarioTrabalho | null, o2: IHorarioTrabalho | null): boolean =>
    this.horarioTrabalhoService.compareHorarioTrabalho(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horarioTrabalhoPeriodo }) => {
      this.horarioTrabalhoPeriodo = horarioTrabalhoPeriodo;
      if (horarioTrabalhoPeriodo) {
        this.updateForm(horarioTrabalhoPeriodo);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const horarioTrabalhoPeriodo = this.horarioTrabalhoPeriodoFormService.getHorarioTrabalhoPeriodo(this.editForm);
    if (horarioTrabalhoPeriodo.id !== null) {
      this.subscribeToSaveResponse(this.horarioTrabalhoPeriodoService.update(horarioTrabalhoPeriodo));
    } else {
      this.subscribeToSaveResponse(this.horarioTrabalhoPeriodoService.create(horarioTrabalhoPeriodo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorarioTrabalhoPeriodo>>): void {
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

  protected updateForm(horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo): void {
    this.horarioTrabalhoPeriodo = horarioTrabalhoPeriodo;
    this.horarioTrabalhoPeriodoFormService.resetForm(this.editForm, horarioTrabalhoPeriodo);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      horarioTrabalhoPeriodo.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      horarioTrabalhoPeriodo.usuarioCriador
    );
    this.horarioTrabalhosSharedCollection = this.horarioTrabalhoService.addHorarioTrabalhoToCollectionIfMissing<IHorarioTrabalho>(
      this.horarioTrabalhosSharedCollection,
      horarioTrabalhoPeriodo.horarioTrabalho
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) =>
          this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.horarioTrabalhoPeriodo?.licenca)
        )
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.horarioTrabalhoPeriodo?.usuarioCriador)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));

    this.horarioTrabalhoService
      .query()
      .pipe(map((res: HttpResponse<IHorarioTrabalho[]>) => res.body ?? []))
      .pipe(
        map((horarioTrabalhos: IHorarioTrabalho[]) =>
          this.horarioTrabalhoService.addHorarioTrabalhoToCollectionIfMissing<IHorarioTrabalho>(
            horarioTrabalhos,
            this.horarioTrabalhoPeriodo?.horarioTrabalho
          )
        )
      )
      .subscribe((horarioTrabalhos: IHorarioTrabalho[]) => (this.horarioTrabalhosSharedCollection = horarioTrabalhos));
  }
}
