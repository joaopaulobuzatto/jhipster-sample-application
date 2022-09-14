import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHorarioTrabalho } from '../horario-trabalho.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../horario-trabalho.test-samples';

import { HorarioTrabalhoService, RestHorarioTrabalho } from './horario-trabalho.service';

const requireRestSample: RestHorarioTrabalho = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
};

describe('HorarioTrabalho Service', () => {
  let service: HorarioTrabalhoService;
  let httpMock: HttpTestingController;
  let expectedResult: IHorarioTrabalho | IHorarioTrabalho[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HorarioTrabalhoService);
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

    it('should create a HorarioTrabalho', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const horarioTrabalho = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(horarioTrabalho).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HorarioTrabalho', () => {
      const horarioTrabalho = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(horarioTrabalho).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HorarioTrabalho', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HorarioTrabalho', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a HorarioTrabalho', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addHorarioTrabalhoToCollectionIfMissing', () => {
      it('should add a HorarioTrabalho to an empty array', () => {
        const horarioTrabalho: IHorarioTrabalho = sampleWithRequiredData;
        expectedResult = service.addHorarioTrabalhoToCollectionIfMissing([], horarioTrabalho);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(horarioTrabalho);
      });

      it('should not add a HorarioTrabalho to an array that contains it', () => {
        const horarioTrabalho: IHorarioTrabalho = sampleWithRequiredData;
        const horarioTrabalhoCollection: IHorarioTrabalho[] = [
          {
            ...horarioTrabalho,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addHorarioTrabalhoToCollectionIfMissing(horarioTrabalhoCollection, horarioTrabalho);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HorarioTrabalho to an array that doesn't contain it", () => {
        const horarioTrabalho: IHorarioTrabalho = sampleWithRequiredData;
        const horarioTrabalhoCollection: IHorarioTrabalho[] = [sampleWithPartialData];
        expectedResult = service.addHorarioTrabalhoToCollectionIfMissing(horarioTrabalhoCollection, horarioTrabalho);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(horarioTrabalho);
      });

      it('should add only unique HorarioTrabalho to an array', () => {
        const horarioTrabalhoArray: IHorarioTrabalho[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const horarioTrabalhoCollection: IHorarioTrabalho[] = [sampleWithRequiredData];
        expectedResult = service.addHorarioTrabalhoToCollectionIfMissing(horarioTrabalhoCollection, ...horarioTrabalhoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const horarioTrabalho: IHorarioTrabalho = sampleWithRequiredData;
        const horarioTrabalho2: IHorarioTrabalho = sampleWithPartialData;
        expectedResult = service.addHorarioTrabalhoToCollectionIfMissing([], horarioTrabalho, horarioTrabalho2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(horarioTrabalho);
        expect(expectedResult).toContain(horarioTrabalho2);
      });

      it('should accept null and undefined values', () => {
        const horarioTrabalho: IHorarioTrabalho = sampleWithRequiredData;
        expectedResult = service.addHorarioTrabalhoToCollectionIfMissing([], null, horarioTrabalho, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(horarioTrabalho);
      });

      it('should return initial array if no HorarioTrabalho is added', () => {
        const horarioTrabalhoCollection: IHorarioTrabalho[] = [sampleWithRequiredData];
        expectedResult = service.addHorarioTrabalhoToCollectionIfMissing(horarioTrabalhoCollection, undefined, null);
        expect(expectedResult).toEqual(horarioTrabalhoCollection);
      });
    });

    describe('compareHorarioTrabalho', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareHorarioTrabalho(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareHorarioTrabalho(entity1, entity2);
        const compareResult2 = service.compareHorarioTrabalho(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareHorarioTrabalho(entity1, entity2);
        const compareResult2 = service.compareHorarioTrabalho(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareHorarioTrabalho(entity1, entity2);
        const compareResult2 = service.compareHorarioTrabalho(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
