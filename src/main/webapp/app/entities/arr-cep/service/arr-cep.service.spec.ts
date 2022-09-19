import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IArrCep } from '../arr-cep.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../arr-cep.test-samples';

import { ArrCepService } from './arr-cep.service';

const requireRestSample: IArrCep = {
  ...sampleWithRequiredData,
};

describe('ArrCep Service', () => {
  let service: ArrCepService;
  let httpMock: HttpTestingController;
  let expectedResult: IArrCep | IArrCep[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ArrCepService);
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

    it('should create a ArrCep', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const arrCep = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(arrCep).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ArrCep', () => {
      const arrCep = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(arrCep).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ArrCep', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ArrCep', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ArrCep', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addArrCepToCollectionIfMissing', () => {
      it('should add a ArrCep to an empty array', () => {
        const arrCep: IArrCep = sampleWithRequiredData;
        expectedResult = service.addArrCepToCollectionIfMissing([], arrCep);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(arrCep);
      });

      it('should not add a ArrCep to an array that contains it', () => {
        const arrCep: IArrCep = sampleWithRequiredData;
        const arrCepCollection: IArrCep[] = [
          {
            ...arrCep,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addArrCepToCollectionIfMissing(arrCepCollection, arrCep);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ArrCep to an array that doesn't contain it", () => {
        const arrCep: IArrCep = sampleWithRequiredData;
        const arrCepCollection: IArrCep[] = [sampleWithPartialData];
        expectedResult = service.addArrCepToCollectionIfMissing(arrCepCollection, arrCep);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(arrCep);
      });

      it('should add only unique ArrCep to an array', () => {
        const arrCepArray: IArrCep[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const arrCepCollection: IArrCep[] = [sampleWithRequiredData];
        expectedResult = service.addArrCepToCollectionIfMissing(arrCepCollection, ...arrCepArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const arrCep: IArrCep = sampleWithRequiredData;
        const arrCep2: IArrCep = sampleWithPartialData;
        expectedResult = service.addArrCepToCollectionIfMissing([], arrCep, arrCep2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(arrCep);
        expect(expectedResult).toContain(arrCep2);
      });

      it('should accept null and undefined values', () => {
        const arrCep: IArrCep = sampleWithRequiredData;
        expectedResult = service.addArrCepToCollectionIfMissing([], null, arrCep, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(arrCep);
      });

      it('should return initial array if no ArrCep is added', () => {
        const arrCepCollection: IArrCep[] = [sampleWithRequiredData];
        expectedResult = service.addArrCepToCollectionIfMissing(arrCepCollection, undefined, null);
        expect(expectedResult).toEqual(arrCepCollection);
      });
    });

    describe('compareArrCep', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareArrCep(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareArrCep(entity1, entity2);
        const compareResult2 = service.compareArrCep(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareArrCep(entity1, entity2);
        const compareResult2 = service.compareArrCep(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareArrCep(entity1, entity2);
        const compareResult2 = service.compareArrCep(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
