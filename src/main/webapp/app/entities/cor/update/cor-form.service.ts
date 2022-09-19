import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICor, NewCor } from '../cor.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICor for edit and NewCorFormGroupInput for create.
 */
type CorFormGroupInput = ICor | PartialWithRequiredKeyOf<NewCor>;

type CorFormDefaults = Pick<NewCor, 'id'>;

type CorFormGroupContent = {
  id: FormControl<ICor['id'] | NewCor['id']>;
  descricao: FormControl<ICor['descricao']>;
};

export type CorFormGroup = FormGroup<CorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CorFormService {
  createCorFormGroup(cor: CorFormGroupInput = { id: null }): CorFormGroup {
    const corRawValue = {
      ...this.getFormDefaults(),
      ...cor,
    };
    return new FormGroup<CorFormGroupContent>({
      id: new FormControl(
        { value: corRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      descricao: new FormControl(corRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
    });
  }

  getCor(form: CorFormGroup): ICor | NewCor {
    return form.getRawValue() as ICor | NewCor;
  }

  resetForm(form: CorFormGroup, cor: CorFormGroupInput): void {
    const corRawValue = { ...this.getFormDefaults(), ...cor };
    form.reset(
      {
        ...corRawValue,
        id: { value: corRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CorFormDefaults {
    return {
      id: null,
    };
  }
}
