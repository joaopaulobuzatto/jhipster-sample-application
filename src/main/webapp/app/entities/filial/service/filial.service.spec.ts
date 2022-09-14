import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFilial } from '../filial.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../filial.test-samples';

import { FilialService, RestFilial } from './filial.service';

const requireRestSample: RestFilial = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
};

describe('Filial Service', () => {
  let service: FilialService;
  let httpMock: HttpTestingController;
  let expectedResult: IFilial | IFilial[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FilialService);
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

    it('should create a Filial', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const filial = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(filial).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Filial', () => {
      const filial = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(filial).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Filial', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Filial', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Filial', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFilialToCollectionIfMissing', () => {
      it('should add a Filial to an empty array', () => {
        const filial: IFilial = sampleWithRequiredData;
        expectedResult = service.addFilialToCollectionIfMissing([], filial);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(filial);
      });

      it('should not add a Filial to an array that contains it', () => {
        const filial: IFilial = sampleWithRequiredData;
        const filialCollection: IFilial[] = [
          {
            ...filial,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFilialToCollectionIfMissing(filialCollection, filial);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Filial to an array that doesn't contain it", () => {
        const filial: IFilial = sampleWithRequiredData;
        const filialCollection: IFilial[] = [sampleWithPartialData];
        expectedResult = service.addFilialToCollectionIfMissing(filialCollection, filial);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(filial);
      });

      it('should add only unique Filial to an array', () => {
        const filialArray: IFilial[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const filialCollection: IFilial[] = [sampleWithRequiredData];
        expectedResult = service.addFilialToCollectionIfMissing(filialCollection, ...filialArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const filial: IFilial = sampleWithRequiredData;
        const filial2: IFilial = sampleWithPartialData;
        expectedResult = service.addFilialToCollectionIfMissing([], filial, filial2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(filial);
        expect(expectedResult).toContain(filial2);
      });

      it('should accept null and undefined values', () => {
        const filial: IFilial = sampleWithRequiredData;
        expectedResult = service.addFilialToCollectionIfMissing([], null, filial, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(filial);
      });

      it('should return initial array if no Filial is added', () => {
        const filialCollection: IFilial[] = [sampleWithRequiredData];
        expectedResult = service.addFilialToCollectionIfMissing(filialCollection, undefined, null);
        expect(expectedResult).toEqual(filialCollection);
      });
    });

    describe('compareFilial', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFilial(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFilial(entity1, entity2);
        const compareResult2 = service.compareFilial(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFilial(entity1, entity2);
        const compareResult2 = service.compareFilial(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFilial(entity1, entity2);
        const compareResult2 = service.compareFilial(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
