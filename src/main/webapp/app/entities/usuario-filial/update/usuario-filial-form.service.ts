import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUsuarioFilial, NewUsuarioFilial } from '../usuario-filial.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUsuarioFilial for edit and NewUsuarioFilialFormGroupInput for create.
 */
type UsuarioFilialFormGroupInput = IUsuarioFilial | PartialWithRequiredKeyOf<NewUsuarioFilial>;

type UsuarioFilialFormDefaults = Pick<NewUsuarioFilial, 'id'>;

type UsuarioFilialFormGroupContent = {
  id: FormControl<IUsuarioFilial['id'] | NewUsuarioFilial['id']>;
  licenca: FormControl<IUsuarioFilial['licenca']>;
  usuario: FormControl<IUsuarioFilial['usuario']>;
  filial: FormControl<IUsuarioFilial['filial']>;
};

export type UsuarioFilialFormGroup = FormGroup<UsuarioFilialFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UsuarioFilialFormService {
  createUsuarioFilialFormGroup(usuarioFilial: UsuarioFilialFormGroupInput = { id: null }): UsuarioFilialFormGroup {
    const usuarioFilialRawValue = {
      ...this.getFormDefaults(),
      ...usuarioFilial,
    };
    return new FormGroup<UsuarioFilialFormGroupContent>({
      id: new FormControl(
        { value: usuarioFilialRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      licenca: new FormControl(usuarioFilialRawValue.licenca),
      usuario: new FormControl(usuarioFilialRawValue.usuario),
      filial: new FormControl(usuarioFilialRawValue.filial),
    });
  }

  getUsuarioFilial(form: UsuarioFilialFormGroup): IUsuarioFilial | NewUsuarioFilial {
    return form.getRawValue() as IUsuarioFilial | NewUsuarioFilial;
  }

  resetForm(form: UsuarioFilialFormGroup, usuarioFilial: UsuarioFilialFormGroupInput): void {
    const usuarioFilialRawValue = { ...this.getFormDefaults(), ...usuarioFilial };
    form.reset(
      {
        ...usuarioFilialRawValue,
        id: { value: usuarioFilialRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UsuarioFilialFormDefaults {
    return {
      id: null,
    };
  }
}
