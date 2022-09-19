import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUsuarioGrupoPermissoes, NewUsuarioGrupoPermissoes } from '../usuario-grupo-permissoes.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUsuarioGrupoPermissoes for edit and NewUsuarioGrupoPermissoesFormGroupInput for create.
 */
type UsuarioGrupoPermissoesFormGroupInput = IUsuarioGrupoPermissoes | PartialWithRequiredKeyOf<NewUsuarioGrupoPermissoes>;

type UsuarioGrupoPermissoesFormDefaults = Pick<NewUsuarioGrupoPermissoes, 'id'>;

type UsuarioGrupoPermissoesFormGroupContent = {
  id: FormControl<IUsuarioGrupoPermissoes['id'] | NewUsuarioGrupoPermissoes['id']>;
  licenca: FormControl<IUsuarioGrupoPermissoes['licenca']>;
  usuario: FormControl<IUsuarioGrupoPermissoes['usuario']>;
  grupoPermissoes: FormControl<IUsuarioGrupoPermissoes['grupoPermissoes']>;
};

export type UsuarioGrupoPermissoesFormGroup = FormGroup<UsuarioGrupoPermissoesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UsuarioGrupoPermissoesFormService {
  createUsuarioGrupoPermissoesFormGroup(
    usuarioGrupoPermissoes: UsuarioGrupoPermissoesFormGroupInput = { id: null }
  ): UsuarioGrupoPermissoesFormGroup {
    const usuarioGrupoPermissoesRawValue = {
      ...this.getFormDefaults(),
      ...usuarioGrupoPermissoes,
    };
    return new FormGroup<UsuarioGrupoPermissoesFormGroupContent>({
      id: new FormControl(
        { value: usuarioGrupoPermissoesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      licenca: new FormControl(usuarioGrupoPermissoesRawValue.licenca),
      usuario: new FormControl(usuarioGrupoPermissoesRawValue.usuario),
      grupoPermissoes: new FormControl(usuarioGrupoPermissoesRawValue.grupoPermissoes),
    });
  }

  getUsuarioGrupoPermissoes(form: UsuarioGrupoPermissoesFormGroup): IUsuarioGrupoPermissoes | NewUsuarioGrupoPermissoes {
    return form.getRawValue() as IUsuarioGrupoPermissoes | NewUsuarioGrupoPermissoes;
  }

  resetForm(form: UsuarioGrupoPermissoesFormGroup, usuarioGrupoPermissoes: UsuarioGrupoPermissoesFormGroupInput): void {
    const usuarioGrupoPermissoesRawValue = { ...this.getFormDefaults(), ...usuarioGrupoPermissoes };
    form.reset(
      {
        ...usuarioGrupoPermissoesRawValue,
        id: { value: usuarioGrupoPermissoesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UsuarioGrupoPermissoesFormDefaults {
    return {
      id: null,
    };
  }
}
