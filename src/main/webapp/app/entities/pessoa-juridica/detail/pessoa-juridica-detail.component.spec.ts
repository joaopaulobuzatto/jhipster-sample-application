import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PessoaJuridicaDetailComponent } from './pessoa-juridica-detail.component';

describe('PessoaJuridica Management Detail Component', () => {
  let comp: PessoaJuridicaDetailComponent;
  let fixture: ComponentFixture<PessoaJuridicaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaJuridicaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pessoaJuridica: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PessoaJuridicaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PessoaJuridicaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pessoaJuridica on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pessoaJuridica).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
