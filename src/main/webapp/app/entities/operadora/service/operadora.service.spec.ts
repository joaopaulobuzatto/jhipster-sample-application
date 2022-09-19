import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOperadora } from '../operadora.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../operadora.test-samples';

import { OperadoraService, RestOperadora } from './operadora.service';

const requireRestSample: RestOperadora = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
};

describe('Operadora Service', () => {
  let service: OperadoraService;
  let httpMock: HttpTestingController;
  let expectedResult: IOperadora | IOperadora[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OperadoraService);
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

    it('should create a Operadora', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const operadora = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(operadora).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Operadora', () => {
      const operadora = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(operadora).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Operadora', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Operadora', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Operadora', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOperadoraToCollectionIfMissing', () => {
      it('should add a Operadora to an empty array', () => {
        const operadora: IOperadora = sampleWithRequiredData;
        expectedResult = service.addOperadoraToCollectionIfMissing([], operadora);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(operadora);
      });

      it('should not add a Operadora to an array that contains it', () => {
        const operadora: IOperadora = sampleWithRequiredData;
        const operadoraCollection: IOperadora[] = [
          {
            ...operadora,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOperadoraToCollectionIfMissing(operadoraCollection, operadora);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Operadora to an array that doesn't contain it", () => {
        const operadora: IOperadora = sampleWithRequiredData;
        const operadoraCollection: IOperadora[] = [sampleWithPartialData];
        expectedResult = service.addOperadoraToCollectionIfMissing(operadoraCollection, operadora);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(operadora);
      });

      it('should add only unique Operadora to an array', () => {
        const operadoraArray: IOperadora[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const operadoraCollection: IOperadora[] = [sampleWithRequiredData];
        expectedResult = service.addOperadoraToCollectionIfMissing(operadoraCollection, ...operadoraArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const operadora: IOperadora = sampleWithRequiredData;
        const operadora2: IOperadora = sampleWithPartialData;
        expectedResult = service.addOperadoraToCollectionIfMissing([], operadora, operadora2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(operadora);
        expect(expectedResult).toContain(operadora2);
      });

      it('should accept null and undefined values', () => {
        const operadora: IOperadora = sampleWithRequiredData;
        expectedResult = service.addOperadoraToCollectionIfMissing([], null, operadora, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(operadora);
      });

      it('should return initial array if no Operadora is added', () => {
        const operadoraCollection: IOperadora[] = [sampleWithRequiredData];
        expectedResult = service.addOperadoraToCollectionIfMissing(operadoraCollection, undefined, null);
        expect(expectedResult).toEqual(operadoraCollection);
      });
    });

    describe('compareOperadora', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOperadora(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOperadora(entity1, entity2);
        const compareResult2 = service.compareOperadora(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOperadora(entity1, entity2);
        const compareResult2 = service.compareOperadora(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOperadora(entity1, entity2);
        const compareResult2 = service.compareOperadora(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
