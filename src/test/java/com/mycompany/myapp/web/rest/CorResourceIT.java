package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Cor;
import com.mycompany.myapp.repository.CorRepository;
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
 * Integration tests for the {@link CorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CorResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CorRepository corRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCorMockMvc;

    private Cor cor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cor createEntity(EntityManager em) {
        Cor cor = new Cor().descricao(DEFAULT_DESCRICAO);
        return cor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cor createUpdatedEntity(EntityManager em) {
        Cor cor = new Cor().descricao(UPDATED_DESCRICAO);
        return cor;
    }

    @BeforeEach
    public void initTest() {
        cor = createEntity(em);
    }

    @Test
    @Transactional
    void createCor() throws Exception {
        int databaseSizeBeforeCreate = corRepository.findAll().size();
        // Create the Cor
        restCorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cor)))
            .andExpect(status().isCreated());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeCreate + 1);
        Cor testCor = corList.get(corList.size() - 1);
        assertThat(testCor.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void createCorWithExistingId() throws Exception {
        // Create the Cor with an existing ID
        cor.setId(1L);

        int databaseSizeBeforeCreate = corRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cor)))
            .andExpect(status().isBadRequest());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = corRepository.findAll().size();
        // set the field null
        cor.setDescricao(null);

        // Create the Cor, which fails.

        restCorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cor)))
            .andExpect(status().isBadRequest());

        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCors() throws Exception {
        // Initialize the database
        corRepository.saveAndFlush(cor);

        // Get all the corList
        restCorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cor.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }

    @Test
    @Transactional
    void getCor() throws Exception {
        // Initialize the database
        corRepository.saveAndFlush(cor);

        // Get the cor
        restCorMockMvc
            .perform(get(ENTITY_API_URL_ID, cor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cor.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    @Transactional
    void getNonExistingCor() throws Exception {
        // Get the cor
        restCorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCor() throws Exception {
        // Initialize the database
        corRepository.saveAndFlush(cor);

        int databaseSizeBeforeUpdate = corRepository.findAll().size();

        // Update the cor
        Cor updatedCor = corRepository.findById(cor.getId()).get();
        // Disconnect from session so that the updates on updatedCor are not directly saved in db
        em.detach(updatedCor);
        updatedCor.descricao(UPDATED_DESCRICAO);

        restCorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCor))
            )
            .andExpect(status().isOk());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeUpdate);
        Cor testCor = corList.get(corList.size() - 1);
        assertThat(testCor.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void putNonExistingCor() throws Exception {
        int databaseSizeBeforeUpdate = corRepository.findAll().size();
        cor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cor.getId()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCor() throws Exception {
        int databaseSizeBeforeUpdate = corRepository.findAll().size();
        cor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCor() throws Exception {
        int databaseSizeBeforeUpdate = corRepository.findAll().size();
        cor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cor)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCorWithPatch() throws Exception {
        // Initialize the database
        corRepository.saveAndFlush(cor);

        int databaseSizeBeforeUpdate = corRepository.findAll().size();

        // Update the cor using partial update
        Cor partialUpdatedCor = new Cor();
        partialUpdatedCor.setId(cor.getId());

        partialUpdatedCor.descricao(UPDATED_DESCRICAO);

        restCorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCor))
            )
            .andExpect(status().isOk());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeUpdate);
        Cor testCor = corList.get(corList.size() - 1);
        assertThat(testCor.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void fullUpdateCorWithPatch() throws Exception {
        // Initialize the database
        corRepository.saveAndFlush(cor);

        int databaseSizeBeforeUpdate = corRepository.findAll().size();

        // Update the cor using partial update
        Cor partialUpdatedCor = new Cor();
        partialUpdatedCor.setId(cor.getId());

        partialUpdatedCor.descricao(UPDATED_DESCRICAO);

        restCorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCor))
            )
            .andExpect(status().isOk());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeUpdate);
        Cor testCor = corList.get(corList.size() - 1);
        assertThat(testCor.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void patchNonExistingCor() throws Exception {
        int databaseSizeBeforeUpdate = corRepository.findAll().size();
        cor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCor() throws Exception {
        int databaseSizeBeforeUpdate = corRepository.findAll().size();
        cor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCor() throws Exception {
        int databaseSizeBeforeUpdate = corRepository.findAll().size();
        cor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCorMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cor)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Cor in the database
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCor() throws Exception {
        // Initialize the database
        corRepository.saveAndFlush(cor);

        int databaseSizeBeforeDelete = corRepository.findAll().size();

        // Delete the cor
        restCorMockMvc.perform(delete(ENTITY_API_URL_ID, cor.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cor> corList = corRepository.findAll();
        assertThat(corList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
