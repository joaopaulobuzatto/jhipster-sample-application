import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServicoDetailComponent } from './servico-detail.component';

describe('Servico Management Detail Component', () => {
  let comp: ServicoDetailComponent;
  let fixture: ComponentFixture<ServicoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ servico: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ServicoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ServicoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load servico on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.servico).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
