import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetentorAnexoArquivoDetailComponent } from './detentor-anexo-arquivo-detail.component';

describe('DetentorAnexoArquivo Management Detail Component', () => {
  let comp: DetentorAnexoArquivoDetailComponent;
  let fixture: ComponentFixture<DetentorAnexoArquivoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetentorAnexoArquivoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ detentorAnexoArquivo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DetentorAnexoArquivoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DetentorAnexoArquivoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load detentorAnexoArquivo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.detentorAnexoArquivo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
