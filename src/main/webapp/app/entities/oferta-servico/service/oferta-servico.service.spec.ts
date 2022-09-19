import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOfertaServico } from '../oferta-servico.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../oferta-servico.test-samples';

import { OfertaServicoService } from './oferta-servico.service';

const requireRestSample: IOfertaServico = {
  ...sampleWithRequiredData,
};

describe('OfertaServico Service', () => {
  let service: OfertaServicoService;
  let httpMock: HttpTestingController;
  let expectedResult: IOfertaServico | IOfertaServico[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OfertaServicoService);
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

    it('should create a OfertaServico', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ofertaServico = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ofertaServico).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OfertaServico', () => {
      const ofertaServico = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ofertaServico).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OfertaServico', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OfertaServico', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OfertaServico', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOfertaServicoToCollectionIfMissing', () => {
      it('should add a OfertaServico to an empty array', () => {
        const ofertaServico: IOfertaServico = sampleWithRequiredData;
        expectedResult = service.addOfertaServicoToCollectionIfMissing([], ofertaServico);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ofertaServico);
      });

      it('should not add a OfertaServico to an array that contains it', () => {
        const ofertaServico: IOfertaServico = sampleWithRequiredData;
        const ofertaServicoCollection: IOfertaServico[] = [
          {
            ...ofertaServico,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOfertaServicoToCollectionIfMissing(ofertaServicoCollection, ofertaServico);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OfertaServico to an array that doesn't contain it", () => {
        const ofertaServico: IOfertaServico = sampleWithRequiredData;
        const ofertaServicoCollection: IOfertaServico[] = [sampleWithPartialData];
        expectedResult = service.addOfertaServicoToCollectionIfMissing(ofertaServicoCollection, ofertaServico);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ofertaServico);
      });

      it('should add only unique OfertaServico to an array', () => {
        const ofertaServicoArray: IOfertaServico[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ofertaServicoCollection: IOfertaServico[] = [sampleWithRequiredData];
        expectedResult = service.addOfertaServicoToCollectionIfMissing(ofertaServicoCollection, ...ofertaServicoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ofertaServico: IOfertaServico = sampleWithRequiredData;
        const ofertaServico2: IOfertaServico = sampleWithPartialData;
        expectedResult = service.addOfertaServicoToCollectionIfMissing([], ofertaServico, ofertaServico2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ofertaServico);
        expect(expectedResult).toContain(ofertaServico2);
      });

      it('should accept null and undefined values', () => {
        const ofertaServico: IOfertaServico = sampleWithRequiredData;
        expectedResult = service.addOfertaServicoToCollectionIfMissing([], null, ofertaServico, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ofertaServico);
      });

      it('should return initial array if no OfertaServico is added', () => {
        const ofertaServicoCollection: IOfertaServico[] = [sampleWithRequiredData];
        expectedResult = service.addOfertaServicoToCollectionIfMissing(ofertaServicoCollection, undefined, null);
        expect(expectedResult).toEqual(ofertaServicoCollection);
      });
    });

    describe('compareOfertaServico', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOfertaServico(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOfertaServico(entity1, entity2);
        const compareResult2 = service.compareOfertaServico(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOfertaServico(entity1, entity2);
        const compareResult2 = service.compareOfertaServico(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOfertaServico(entity1, entity2);
        const compareResult2 = service.compareOfertaServico(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
