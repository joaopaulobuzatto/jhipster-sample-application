package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.TipoDeDocumentoAnexavel;
import com.mycompany.myapp.repository.TipoDeDocumentoAnexavelRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link TipoDeDocumentoAnexavelResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TipoDeDocumentoAnexavelResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tipo-de-documento-anexavels";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TipoDeDocumentoAnexavelRepository tipoDeDocumentoAnexavelRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoDeDocumentoAnexavelMockMvc;

    private TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDeDocumentoAnexavel createEntity(EntityManager em) {
        TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel = new TipoDeDocumentoAnexavel()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .descricao(DEFAULT_DESCRICAO);
        return tipoDeDocumentoAnexavel;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDeDocumentoAnexavel createUpdatedEntity(EntityManager em) {
        TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel = new TipoDeDocumentoAnexavel()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO);
        return tipoDeDocumentoAnexavel;
    }

    @BeforeEach
    public void initTest() {
        tipoDeDocumentoAnexavel = createEntity(em);
    }

    @Test
    @Transactional
    void createTipoDeDocumentoAnexavel() throws Exception {
        int databaseSizeBeforeCreate = tipoDeDocumentoAnexavelRepository.findAll().size();
        // Create the TipoDeDocumentoAnexavel
        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDeDocumentoAnexavel))
            )
            .andExpect(status().isCreated());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeCreate + 1);
        TipoDeDocumentoAnexavel testTipoDeDocumentoAnexavel = tipoDeDocumentoAnexavelList.get(tipoDeDocumentoAnexavelList.size() - 1);
        assertThat(testTipoDeDocumentoAnexavel.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testTipoDeDocumentoAnexavel.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testTipoDeDocumentoAnexavel.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void createTipoDeDocumentoAnexavelWithExistingId() throws Exception {
        // Create the TipoDeDocumentoAnexavel with an existing ID
        tipoDeDocumentoAnexavel.setId(1L);

        int databaseSizeBeforeCreate = tipoDeDocumentoAnexavelRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDeDocumentoAnexavel))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoDeDocumentoAnexavelRepository.findAll().size();
        // set the field null
        tipoDeDocumentoAnexavel.setDataCriacao(null);

        // Create the TipoDeDocumentoAnexavel, which fails.

        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDeDocumentoAnexavel))
            )
            .andExpect(status().isBadRequest());

        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoDeDocumentoAnexavelRepository.findAll().size();
        // set the field null
        tipoDeDocumentoAnexavel.setDescricao(null);

        // Create the TipoDeDocumentoAnexavel, which fails.

        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDeDocumentoAnexavel))
            )
            .andExpect(status().isBadRequest());

        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTipoDeDocumentoAnexavels() throws Exception {
        // Initialize the database
        tipoDeDocumentoAnexavelRepository.saveAndFlush(tipoDeDocumentoAnexavel);

        // Get all the tipoDeDocumentoAnexavelList
        restTipoDeDocumentoAnexavelMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoDeDocumentoAnexavel.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }

    @Test
    @Transactional
    void getTipoDeDocumentoAnexavel() throws Exception {
        // Initialize the database
        tipoDeDocumentoAnexavelRepository.saveAndFlush(tipoDeDocumentoAnexavel);

        // Get the tipoDeDocumentoAnexavel
        restTipoDeDocumentoAnexavelMockMvc
            .perform(get(ENTITY_API_URL_ID, tipoDeDocumentoAnexavel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoDeDocumentoAnexavel.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    @Transactional
    void getNonExistingTipoDeDocumentoAnexavel() throws Exception {
        // Get the tipoDeDocumentoAnexavel
        restTipoDeDocumentoAnexavelMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTipoDeDocumentoAnexavel() throws Exception {
        // Initialize the database
        tipoDeDocumentoAnexavelRepository.saveAndFlush(tipoDeDocumentoAnexavel);

        int databaseSizeBeforeUpdate = tipoDeDocumentoAnexavelRepository.findAll().size();

        // Update the tipoDeDocumentoAnexavel
        TipoDeDocumentoAnexavel updatedTipoDeDocumentoAnexavel = tipoDeDocumentoAnexavelRepository
            .findById(tipoDeDocumentoAnexavel.getId())
            .get();
        // Disconnect from session so that the updates on updatedTipoDeDocumentoAnexavel are not directly saved in db
        em.detach(updatedTipoDeDocumentoAnexavel);
        updatedTipoDeDocumentoAnexavel.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO);

        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTipoDeDocumentoAnexavel.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTipoDeDocumentoAnexavel))
            )
            .andExpect(status().isOk());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeUpdate);
        TipoDeDocumentoAnexavel testTipoDeDocumentoAnexavel = tipoDeDocumentoAnexavelList.get(tipoDeDocumentoAnexavelList.size() - 1);
        assertThat(testTipoDeDocumentoAnexavel.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testTipoDeDocumentoAnexavel.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testTipoDeDocumentoAnexavel.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void putNonExistingTipoDeDocumentoAnexavel() throws Exception {
        int databaseSizeBeforeUpdate = tipoDeDocumentoAnexavelRepository.findAll().size();
        tipoDeDocumentoAnexavel.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoDeDocumentoAnexavel.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDeDocumentoAnexavel))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTipoDeDocumentoAnexavel() throws Exception {
        int databaseSizeBeforeUpdate = tipoDeDocumentoAnexavelRepository.findAll().size();
        tipoDeDocumentoAnexavel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDeDocumentoAnexavel))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTipoDeDocumentoAnexavel() throws Exception {
        int databaseSizeBeforeUpdate = tipoDeDocumentoAnexavelRepository.findAll().size();
        tipoDeDocumentoAnexavel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDeDocumentoAnexavel))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTipoDeDocumentoAnexavelWithPatch() throws Exception {
        // Initialize the database
        tipoDeDocumentoAnexavelRepository.saveAndFlush(tipoDeDocumentoAnexavel);

        int databaseSizeBeforeUpdate = tipoDeDocumentoAnexavelRepository.findAll().size();

        // Update the tipoDeDocumentoAnexavel using partial update
        TipoDeDocumentoAnexavel partialUpdatedTipoDeDocumentoAnexavel = new TipoDeDocumentoAnexavel();
        partialUpdatedTipoDeDocumentoAnexavel.setId(tipoDeDocumentoAnexavel.getId());

        partialUpdatedTipoDeDocumentoAnexavel.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO);

        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoDeDocumentoAnexavel.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoDeDocumentoAnexavel))
            )
            .andExpect(status().isOk());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeUpdate);
        TipoDeDocumentoAnexavel testTipoDeDocumentoAnexavel = tipoDeDocumentoAnexavelList.get(tipoDeDocumentoAnexavelList.size() - 1);
        assertThat(testTipoDeDocumentoAnexavel.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testTipoDeDocumentoAnexavel.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testTipoDeDocumentoAnexavel.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void fullUpdateTipoDeDocumentoAnexavelWithPatch() throws Exception {
        // Initialize the database
        tipoDeDocumentoAnexavelRepository.saveAndFlush(tipoDeDocumentoAnexavel);

        int databaseSizeBeforeUpdate = tipoDeDocumentoAnexavelRepository.findAll().size();

        // Update the tipoDeDocumentoAnexavel using partial update
        TipoDeDocumentoAnexavel partialUpdatedTipoDeDocumentoAnexavel = new TipoDeDocumentoAnexavel();
        partialUpdatedTipoDeDocumentoAnexavel.setId(tipoDeDocumentoAnexavel.getId());

        partialUpdatedTipoDeDocumentoAnexavel.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO);

        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoDeDocumentoAnexavel.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoDeDocumentoAnexavel))
            )
            .andExpect(status().isOk());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeUpdate);
        TipoDeDocumentoAnexavel testTipoDeDocumentoAnexavel = tipoDeDocumentoAnexavelList.get(tipoDeDocumentoAnexavelList.size() - 1);
        assertThat(testTipoDeDocumentoAnexavel.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testTipoDeDocumentoAnexavel.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testTipoDeDocumentoAnexavel.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void patchNonExistingTipoDeDocumentoAnexavel() throws Exception {
        int databaseSizeBeforeUpdate = tipoDeDocumentoAnexavelRepository.findAll().size();
        tipoDeDocumentoAnexavel.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tipoDeDocumentoAnexavel.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoDeDocumentoAnexavel))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTipoDeDocumentoAnexavel() throws Exception {
        int databaseSizeBeforeUpdate = tipoDeDocumentoAnexavelRepository.findAll().size();
        tipoDeDocumentoAnexavel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoDeDocumentoAnexavel))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTipoDeDocumentoAnexavel() throws Exception {
        int databaseSizeBeforeUpdate = tipoDeDocumentoAnexavelRepository.findAll().size();
        tipoDeDocumentoAnexavel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDeDocumentoAnexavelMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoDeDocumentoAnexavel))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoDeDocumentoAnexavel in the database
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTipoDeDocumentoAnexavel() throws Exception {
        // Initialize the database
        tipoDeDocumentoAnexavelRepository.saveAndFlush(tipoDeDocumentoAnexavel);

        int databaseSizeBeforeDelete = tipoDeDocumentoAnexavelRepository.findAll().size();

        // Delete the tipoDeDocumentoAnexavel
        restTipoDeDocumentoAnexavelMockMvc
            .perform(delete(ENTITY_API_URL_ID, tipoDeDocumentoAnexavel.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavelList = tipoDeDocumentoAnexavelRepository.findAll();
        assertThat(tipoDeDocumentoAnexavelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
