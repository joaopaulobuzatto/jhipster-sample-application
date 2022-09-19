import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHorarioTrabalhoPeriodo } from '../horario-trabalho-periodo.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../horario-trabalho-periodo.test-samples';

import { HorarioTrabalhoPeriodoService, RestHorarioTrabalhoPeriodo } from './horario-trabalho-periodo.service';

const requireRestSample: RestHorarioTrabalhoPeriodo = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
  periodo1Inicio: sampleWithRequiredData.periodo1Inicio?.toJSON(),
  periodo1Fim: sampleWithRequiredData.periodo1Fim?.toJSON(),
  periodo2Inicio: sampleWithRequiredData.periodo2Inicio?.toJSON(),
  periodo2Fim: sampleWithRequiredData.periodo2Fim?.toJSON(),
  periodo3Inicio: sampleWithRequiredData.periodo3Inicio?.toJSON(),
  periodo3Fim: sampleWithRequiredData.periodo3Fim?.toJSON(),
  periodo4Inicio: sampleWithRequiredData.periodo4Inicio?.toJSON(),
  periodo4Fim: sampleWithRequiredData.periodo4Fim?.toJSON(),
};

describe('HorarioTrabalhoPeriodo Service', () => {
  let service: HorarioTrabalhoPeriodoService;
  let httpMock: HttpTestingController;
  let expectedResult: IHorarioTrabalhoPeriodo | IHorarioTrabalhoPeriodo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HorarioTrabalhoPeriodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a HorarioTrabalhoPeriodo', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const horarioTrabalhoPeriodo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(horarioTrabalhoPeriodo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HorarioTrabalhoPeriodo', () => {
      const horarioTrabalhoPeriodo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(horarioTrabalhoPeriodo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HorarioTrabalhoPeriodo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HorarioTrabalhoPeriodo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a HorarioTrabalhoPeriodo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addHorarioTrabalhoPeriodoToCollectionIfMissing', () => {
      it('should add a HorarioTrabalhoPeriodo to an empty array', () => {
        const horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo = sampleWithRequiredData;
        expectedResult = service.addHorarioTrabalhoPeriodoToCollectionIfMissing([], horarioTrabalhoPeriodo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(horarioTrabalhoPeriodo);
      });

      it('should not add a HorarioTrabalhoPeriodo to an array that contains it', () => {
        const horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo = sampleWithRequiredData;
        const horarioTrabalhoPeriodoCollection: IHorarioTrabalhoPeriodo[] = [
          {
            ...horarioTrabalhoPeriodo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addHorarioTrabalhoPeriodoToCollectionIfMissing(horarioTrabalhoPeriodoCollection, horarioTrabalhoPeriodo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HorarioTrabalhoPeriodo to an array that doesn't contain it", () => {
        const horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo = sampleWithRequiredData;
        const horarioTrabalhoPeriodoCollection: IHorarioTrabalhoPeriodo[] = [sampleWithPartialData];
        expectedResult = service.addHorarioTrabalhoPeriodoToCollectionIfMissing(horarioTrabalhoPeriodoCollection, horarioTrabalhoPeriodo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(horarioTrabalhoPeriodo);
      });

      it('should add only unique HorarioTrabalhoPeriodo to an array', () => {
        const horarioTrabalhoPeriodoArray: IHorarioTrabalhoPeriodo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const horarioTrabalhoPeriodoCollection: IHorarioTrabalhoPeriodo[] = [sampleWithRequiredData];
        expectedResult = service.addHorarioTrabalhoPeriodoToCollectionIfMissing(
          horarioTrabalhoPeriodoCollection,
          ...horarioTrabalhoPeriodoArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo = sampleWithRequiredData;
        const horarioTrabalhoPeriodo2: IHorarioTrabalhoPeriodo = sampleWithPartialData;
        expectedResult = service.addHorarioTrabalhoPeriodoToCollectionIfMissing([], horarioTrabalhoPeriodo, horarioTrabalhoPeriodo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(horarioTrabalhoPeriodo);
        expect(expectedResult).toContain(horarioTrabalhoPeriodo2);
      });

      it('should accept null and undefined values', () => {
        const horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo = sampleWithRequiredData;
        expectedResult = service.addHorarioTrabalhoPeriodoToCollectionIfMissing([], null, horarioTrabalhoPeriodo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(horarioTrabalhoPeriodo);
      });

      it('should return initial array if no HorarioTrabalhoPeriodo is added', () => {
        const horarioTrabalhoPeriodoCollection: IHorarioTrabalhoPeriodo[] = [sampleWithRequiredData];
        expectedResult = service.addHorarioTrabalhoPeriodoToCollectionIfMissing(horarioTrabalhoPeriodoCollection, undefined, null);
        expect(expectedResult).toEqual(horarioTrabalhoPeriodoCollection);
      });
    });

    describe('compareHorarioTrabalhoPeriodo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareHorarioTrabalhoPeriodo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareHorarioTrabalhoPeriodo(entity1, entity2);
        const compareResult2 = service.compareHorarioTrabalhoPeriodo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareHorarioTrabalhoPeriodo(entity1, entity2);
        const compareResult2 = service.compareHorarioTrabalhoPeriodo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareHorarioTrabalhoPeriodo(entity1, entity2);
        const compareResult2 = service.compareHorarioTrabalhoPeriodo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
