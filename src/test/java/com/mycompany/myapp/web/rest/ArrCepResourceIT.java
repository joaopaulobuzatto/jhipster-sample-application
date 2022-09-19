package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ArrCep;
import com.mycompany.myapp.repository.ArrCepRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ArrCepResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ArrCepResourceIT {

    private static final String DEFAULT_CEPNUM = "AAAAAAAA";
    private static final String UPDATED_CEPNUM = "BBBBBBBB";

    private static final String DEFAULT_CEPENDTIP = "AAAAAAAAAA";
    private static final String UPDATED_CEPENDTIP = "BBBBBBBBBB";

    private static final String DEFAULT_CEPEND = "AAAAAAAAAA";
    private static final String UPDATED_CEPEND = "BBBBBBBBBB";

    private static final String DEFAULT_CEPENDCOMPL = "AAAAAAAAAA";
    private static final String UPDATED_CEPENDCOMPL = "BBBBBBBBBB";

    private static final String DEFAULT_CEPBAI = "AAAAAAAAAA";
    private static final String UPDATED_CEPBAI = "BBBBBBBBBB";

    private static final String DEFAULT_CEPCID = "AAAAAAAA";
    private static final String UPDATED_CEPCID = "BBBBBBBB";

    private static final Integer DEFAULT_CEPMUNCOD = 1;
    private static final Integer UPDATED_CEPMUNCOD = 2;

    private static final String DEFAULT_CEPMUNNOM = "AAAAAAAAAA";
    private static final String UPDATED_CEPMUNNOM = "BBBBBBBBBB";

    private static final String DEFAULT_CEPMUNUF = "AA";
    private static final String UPDATED_CEPMUNUF = "BB";

    private static final String ENTITY_API_URL = "/api/arr-ceps";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ArrCepRepository arrCepRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restArrCepMockMvc;

    private ArrCep arrCep;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ArrCep createEntity(EntityManager em) {
        ArrCep arrCep = new ArrCep()
            .cepnum(DEFAULT_CEPNUM)
            .cependtip(DEFAULT_CEPENDTIP)
            .cepend(DEFAULT_CEPEND)
            .cependcompl(DEFAULT_CEPENDCOMPL)
            .cepbai(DEFAULT_CEPBAI)
            .cepcid(DEFAULT_CEPCID)
            .cepmuncod(DEFAULT_CEPMUNCOD)
            .cepmunnom(DEFAULT_CEPMUNNOM)
            .cepmunuf(DEFAULT_CEPMUNUF);
        return arrCep;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ArrCep createUpdatedEntity(EntityManager em) {
        ArrCep arrCep = new ArrCep()
            .cepnum(UPDATED_CEPNUM)
            .cependtip(UPDATED_CEPENDTIP)
            .cepend(UPDATED_CEPEND)
            .cependcompl(UPDATED_CEPENDCOMPL)
            .cepbai(UPDATED_CEPBAI)
            .cepcid(UPDATED_CEPCID)
            .cepmuncod(UPDATED_CEPMUNCOD)
            .cepmunnom(UPDATED_CEPMUNNOM)
            .cepmunuf(UPDATED_CEPMUNUF);
        return arrCep;
    }

    @BeforeEach
    public void initTest() {
        arrCep = createEntity(em);
    }

    @Test
    @Transactional
    void createArrCep() throws Exception {
        int databaseSizeBeforeCreate = arrCepRepository.findAll().size();
        // Create the ArrCep
        restArrCepMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(arrCep)))
            .andExpect(status().isCreated());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeCreate + 1);
        ArrCep testArrCep = arrCepList.get(arrCepList.size() - 1);
        assertThat(testArrCep.getCepnum()).isEqualTo(DEFAULT_CEPNUM);
        assertThat(testArrCep.getCependtip()).isEqualTo(DEFAULT_CEPENDTIP);
        assertThat(testArrCep.getCepend()).isEqualTo(DEFAULT_CEPEND);
        assertThat(testArrCep.getCependcompl()).isEqualTo(DEFAULT_CEPENDCOMPL);
        assertThat(testArrCep.getCepbai()).isEqualTo(DEFAULT_CEPBAI);
        assertThat(testArrCep.getCepcid()).isEqualTo(DEFAULT_CEPCID);
        assertThat(testArrCep.getCepmuncod()).isEqualTo(DEFAULT_CEPMUNCOD);
        assertThat(testArrCep.getCepmunnom()).isEqualTo(DEFAULT_CEPMUNNOM);
        assertThat(testArrCep.getCepmunuf()).isEqualTo(DEFAULT_CEPMUNUF);
    }

    @Test
    @Transactional
    void createArrCepWithExistingId() throws Exception {
        // Create the ArrCep with an existing ID
        arrCep.setId(1L);

        int databaseSizeBeforeCreate = arrCepRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restArrCepMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(arrCep)))
            .andExpect(status().isBadRequest());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCepnumIsRequired() throws Exception {
        int databaseSizeBeforeTest = arrCepRepository.findAll().size();
        // set the field null
        arrCep.setCepnum(null);

        // Create the ArrCep, which fails.

        restArrCepMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(arrCep)))
            .andExpect(status().isBadRequest());

        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllArrCeps() throws Exception {
        // Initialize the database
        arrCepRepository.saveAndFlush(arrCep);

        // Get all the arrCepList
        restArrCepMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(arrCep.getId().intValue())))
            .andExpect(jsonPath("$.[*].cepnum").value(hasItem(DEFAULT_CEPNUM)))
            .andExpect(jsonPath("$.[*].cependtip").value(hasItem(DEFAULT_CEPENDTIP)))
            .andExpect(jsonPath("$.[*].cepend").value(hasItem(DEFAULT_CEPEND)))
            .andExpect(jsonPath("$.[*].cependcompl").value(hasItem(DEFAULT_CEPENDCOMPL)))
            .andExpect(jsonPath("$.[*].cepbai").value(hasItem(DEFAULT_CEPBAI)))
            .andExpect(jsonPath("$.[*].cepcid").value(hasItem(DEFAULT_CEPCID)))
            .andExpect(jsonPath("$.[*].cepmuncod").value(hasItem(DEFAULT_CEPMUNCOD)))
            .andExpect(jsonPath("$.[*].cepmunnom").value(hasItem(DEFAULT_CEPMUNNOM)))
            .andExpect(jsonPath("$.[*].cepmunuf").value(hasItem(DEFAULT_CEPMUNUF)));
    }

    @Test
    @Transactional
    void getArrCep() throws Exception {
        // Initialize the database
        arrCepRepository.saveAndFlush(arrCep);

        // Get the arrCep
        restArrCepMockMvc
            .perform(get(ENTITY_API_URL_ID, arrCep.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(arrCep.getId().intValue()))
            .andExpect(jsonPath("$.cepnum").value(DEFAULT_CEPNUM))
            .andExpect(jsonPath("$.cependtip").value(DEFAULT_CEPENDTIP))
            .andExpect(jsonPath("$.cepend").value(DEFAULT_CEPEND))
            .andExpect(jsonPath("$.cependcompl").value(DEFAULT_CEPENDCOMPL))
            .andExpect(jsonPath("$.cepbai").value(DEFAULT_CEPBAI))
            .andExpect(jsonPath("$.cepcid").value(DEFAULT_CEPCID))
            .andExpect(jsonPath("$.cepmuncod").value(DEFAULT_CEPMUNCOD))
            .andExpect(jsonPath("$.cepmunnom").value(DEFAULT_CEPMUNNOM))
            .andExpect(jsonPath("$.cepmunuf").value(DEFAULT_CEPMUNUF));
    }

    @Test
    @Transactional
    void getNonExistingArrCep() throws Exception {
        // Get the arrCep
        restArrCepMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingArrCep() throws Exception {
        // Initialize the database
        arrCepRepository.saveAndFlush(arrCep);

        int databaseSizeBeforeUpdate = arrCepRepository.findAll().size();

        // Update the arrCep
        ArrCep updatedArrCep = arrCepRepository.findById(arrCep.getId()).get();
        // Disconnect from session so that the updates on updatedArrCep are not directly saved in db
        em.detach(updatedArrCep);
        updatedArrCep
            .cepnum(UPDATED_CEPNUM)
            .cependtip(UPDATED_CEPENDTIP)
            .cepend(UPDATED_CEPEND)
            .cependcompl(UPDATED_CEPENDCOMPL)
            .cepbai(UPDATED_CEPBAI)
            .cepcid(UPDATED_CEPCID)
            .cepmuncod(UPDATED_CEPMUNCOD)
            .cepmunnom(UPDATED_CEPMUNNOM)
            .cepmunuf(UPDATED_CEPMUNUF);

        restArrCepMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedArrCep.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedArrCep))
            )
            .andExpect(status().isOk());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeUpdate);
        ArrCep testArrCep = arrCepList.get(arrCepList.size() - 1);
        assertThat(testArrCep.getCepnum()).isEqualTo(UPDATED_CEPNUM);
        assertThat(testArrCep.getCependtip()).isEqualTo(UPDATED_CEPENDTIP);
        assertThat(testArrCep.getCepend()).isEqualTo(UPDATED_CEPEND);
        assertThat(testArrCep.getCependcompl()).isEqualTo(UPDATED_CEPENDCOMPL);
        assertThat(testArrCep.getCepbai()).isEqualTo(UPDATED_CEPBAI);
        assertThat(testArrCep.getCepcid()).isEqualTo(UPDATED_CEPCID);
        assertThat(testArrCep.getCepmuncod()).isEqualTo(UPDATED_CEPMUNCOD);
        assertThat(testArrCep.getCepmunnom()).isEqualTo(UPDATED_CEPMUNNOM);
        assertThat(testArrCep.getCepmunuf()).isEqualTo(UPDATED_CEPMUNUF);
    }

    @Test
    @Transactional
    void putNonExistingArrCep() throws Exception {
        int databaseSizeBeforeUpdate = arrCepRepository.findAll().size();
        arrCep.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArrCepMockMvc
            .perform(
                put(ENTITY_API_URL_ID, arrCep.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(arrCep))
            )
            .andExpect(status().isBadRequest());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchArrCep() throws Exception {
        int databaseSizeBeforeUpdate = arrCepRepository.findAll().size();
        arrCep.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArrCepMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(arrCep))
            )
            .andExpect(status().isBadRequest());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamArrCep() throws Exception {
        int databaseSizeBeforeUpdate = arrCepRepository.findAll().size();
        arrCep.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArrCepMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(arrCep)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateArrCepWithPatch() throws Exception {
        // Initialize the database
        arrCepRepository.saveAndFlush(arrCep);

        int databaseSizeBeforeUpdate = arrCepRepository.findAll().size();

        // Update the arrCep using partial update
        ArrCep partialUpdatedArrCep = new ArrCep();
        partialUpdatedArrCep.setId(arrCep.getId());

        partialUpdatedArrCep
            .cepnum(UPDATED_CEPNUM)
            .cepend(UPDATED_CEPEND)
            .cependcompl(UPDATED_CEPENDCOMPL)
            .cepbai(UPDATED_CEPBAI)
            .cepmuncod(UPDATED_CEPMUNCOD)
            .cepmunuf(UPDATED_CEPMUNUF);

        restArrCepMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedArrCep.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedArrCep))
            )
            .andExpect(status().isOk());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeUpdate);
        ArrCep testArrCep = arrCepList.get(arrCepList.size() - 1);
        assertThat(testArrCep.getCepnum()).isEqualTo(UPDATED_CEPNUM);
        assertThat(testArrCep.getCependtip()).isEqualTo(DEFAULT_CEPENDTIP);
        assertThat(testArrCep.getCepend()).isEqualTo(UPDATED_CEPEND);
        assertThat(testArrCep.getCependcompl()).isEqualTo(UPDATED_CEPENDCOMPL);
        assertThat(testArrCep.getCepbai()).isEqualTo(UPDATED_CEPBAI);
        assertThat(testArrCep.getCepcid()).isEqualTo(DEFAULT_CEPCID);
        assertThat(testArrCep.getCepmuncod()).isEqualTo(UPDATED_CEPMUNCOD);
        assertThat(testArrCep.getCepmunnom()).isEqualTo(DEFAULT_CEPMUNNOM);
        assertThat(testArrCep.getCepmunuf()).isEqualTo(UPDATED_CEPMUNUF);
    }

    @Test
    @Transactional
    void fullUpdateArrCepWithPatch() throws Exception {
        // Initialize the database
        arrCepRepository.saveAndFlush(arrCep);

        int databaseSizeBeforeUpdate = arrCepRepository.findAll().size();

        // Update the arrCep using partial update
        ArrCep partialUpdatedArrCep = new ArrCep();
        partialUpdatedArrCep.setId(arrCep.getId());

        partialUpdatedArrCep
            .cepnum(UPDATED_CEPNUM)
            .cependtip(UPDATED_CEPENDTIP)
            .cepend(UPDATED_CEPEND)
            .cependcompl(UPDATED_CEPENDCOMPL)
            .cepbai(UPDATED_CEPBAI)
            .cepcid(UPDATED_CEPCID)
            .cepmuncod(UPDATED_CEPMUNCOD)
            .cepmunnom(UPDATED_CEPMUNNOM)
            .cepmunuf(UPDATED_CEPMUNUF);

        restArrCepMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedArrCep.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedArrCep))
            )
            .andExpect(status().isOk());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeUpdate);
        ArrCep testArrCep = arrCepList.get(arrCepList.size() - 1);
        assertThat(testArrCep.getCepnum()).isEqualTo(UPDATED_CEPNUM);
        assertThat(testArrCep.getCependtip()).isEqualTo(UPDATED_CEPENDTIP);
        assertThat(testArrCep.getCepend()).isEqualTo(UPDATED_CEPEND);
        assertThat(testArrCep.getCependcompl()).isEqualTo(UPDATED_CEPENDCOMPL);
        assertThat(testArrCep.getCepbai()).isEqualTo(UPDATED_CEPBAI);
        assertThat(testArrCep.getCepcid()).isEqualTo(UPDATED_CEPCID);
        assertThat(testArrCep.getCepmuncod()).isEqualTo(UPDATED_CEPMUNCOD);
        assertThat(testArrCep.getCepmunnom()).isEqualTo(UPDATED_CEPMUNNOM);
        assertThat(testArrCep.getCepmunuf()).isEqualTo(UPDATED_CEPMUNUF);
    }

    @Test
    @Transactional
    void patchNonExistingArrCep() throws Exception {
        int databaseSizeBeforeUpdate = arrCepRepository.findAll().size();
        arrCep.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArrCepMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, arrCep.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(arrCep))
            )
            .andExpect(status().isBadRequest());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchArrCep() throws Exception {
        int databaseSizeBeforeUpdate = arrCepRepository.findAll().size();
        arrCep.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArrCepMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(arrCep))
            )
            .andExpect(status().isBadRequest());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamArrCep() throws Exception {
        int databaseSizeBeforeUpdate = arrCepRepository.findAll().size();
        arrCep.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArrCepMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(arrCep)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ArrCep in the database
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteArrCep() throws Exception {
        // Initialize the database
        arrCepRepository.saveAndFlush(arrCep);

        int databaseSizeBeforeDelete = arrCepRepository.findAll().size();

        // Delete the arrCep
        restArrCepMockMvc
            .perform(delete(ENTITY_API_URL_ID, arrCep.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ArrCep> arrCepList = arrCepRepository.findAll();
        assertThat(arrCepList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
