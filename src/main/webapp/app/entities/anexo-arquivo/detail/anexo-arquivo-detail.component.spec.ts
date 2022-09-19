import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AnexoArquivoDetailComponent } from './anexo-arquivo-detail.component';

describe('AnexoArquivo Management Detail Component', () => {
  let comp: AnexoArquivoDetailComponent;
  let fixture: ComponentFixture<AnexoArquivoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnexoArquivoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ anexoArquivo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AnexoArquivoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AnexoArquivoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load anexoArquivo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.anexoArquivo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
