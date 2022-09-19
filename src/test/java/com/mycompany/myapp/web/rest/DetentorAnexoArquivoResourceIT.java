package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.DetentorAnexoArquivo;
import com.mycompany.myapp.repository.DetentorAnexoArquivoRepository;
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
 * Integration tests for the {@link DetentorAnexoArquivoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DetentorAnexoArquivoResourceIT {

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/detentor-anexo-arquivos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DetentorAnexoArquivoRepository detentorAnexoArquivoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDetentorAnexoArquivoMockMvc;

    private DetentorAnexoArquivo detentorAnexoArquivo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetentorAnexoArquivo createEntity(EntityManager em) {
        DetentorAnexoArquivo detentorAnexoArquivo = new DetentorAnexoArquivo().dataCriacao(DEFAULT_DATA_CRIACAO);
        return detentorAnexoArquivo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetentorAnexoArquivo createUpdatedEntity(EntityManager em) {
        DetentorAnexoArquivo detentorAnexoArquivo = new DetentorAnexoArquivo().dataCriacao(UPDATED_DATA_CRIACAO);
        return detentorAnexoArquivo;
    }

    @BeforeEach
    public void initTest() {
        detentorAnexoArquivo = createEntity(em);
    }

    @Test
    @Transactional
    void createDetentorAnexoArquivo() throws Exception {
        int databaseSizeBeforeCreate = detentorAnexoArquivoRepository.findAll().size();
        // Create the DetentorAnexoArquivo
        restDetentorAnexoArquivoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detentorAnexoArquivo))
            )
            .andExpect(status().isCreated());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeCreate + 1);
        DetentorAnexoArquivo testDetentorAnexoArquivo = detentorAnexoArquivoList.get(detentorAnexoArquivoList.size() - 1);
        assertThat(testDetentorAnexoArquivo.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
    }

    @Test
    @Transactional
    void createDetentorAnexoArquivoWithExistingId() throws Exception {
        // Create the DetentorAnexoArquivo with an existing ID
        detentorAnexoArquivo.setId(1L);

        int databaseSizeBeforeCreate = detentorAnexoArquivoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetentorAnexoArquivoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detentorAnexoArquivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = detentorAnexoArquivoRepository.findAll().size();
        // set the field null
        detentorAnexoArquivo.setDataCriacao(null);

        // Create the DetentorAnexoArquivo, which fails.

        restDetentorAnexoArquivoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detentorAnexoArquivo))
            )
            .andExpect(status().isBadRequest());

        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDetentorAnexoArquivos() throws Exception {
        // Initialize the database
        detentorAnexoArquivoRepository.saveAndFlush(detentorAnexoArquivo);

        // Get all the detentorAnexoArquivoList
        restDetentorAnexoArquivoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detentorAnexoArquivo.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())));
    }

    @Test
    @Transactional
    void getDetentorAnexoArquivo() throws Exception {
        // Initialize the database
        detentorAnexoArquivoRepository.saveAndFlush(detentorAnexoArquivo);

        // Get the detentorAnexoArquivo
        restDetentorAnexoArquivoMockMvc
            .perform(get(ENTITY_API_URL_ID, detentorAnexoArquivo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(detentorAnexoArquivo.getId().intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()));
    }

    @Test
    @Transactional
    void getNonExistingDetentorAnexoArquivo() throws Exception {
        // Get the detentorAnexoArquivo
        restDetentorAnexoArquivoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDetentorAnexoArquivo() throws Exception {
        // Initialize the database
        detentorAnexoArquivoRepository.saveAndFlush(detentorAnexoArquivo);

        int databaseSizeBeforeUpdate = detentorAnexoArquivoRepository.findAll().size();

        // Update the detentorAnexoArquivo
        DetentorAnexoArquivo updatedDetentorAnexoArquivo = detentorAnexoArquivoRepository.findById(detentorAnexoArquivo.getId()).get();
        // Disconnect from session so that the updates on updatedDetentorAnexoArquivo are not directly saved in db
        em.detach(updatedDetentorAnexoArquivo);
        updatedDetentorAnexoArquivo.dataCriacao(UPDATED_DATA_CRIACAO);

        restDetentorAnexoArquivoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDetentorAnexoArquivo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDetentorAnexoArquivo))
            )
            .andExpect(status().isOk());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeUpdate);
        DetentorAnexoArquivo testDetentorAnexoArquivo = detentorAnexoArquivoList.get(detentorAnexoArquivoList.size() - 1);
        assertThat(testDetentorAnexoArquivo.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
    }

    @Test
    @Transactional
    void putNonExistingDetentorAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = detentorAnexoArquivoRepository.findAll().size();
        detentorAnexoArquivo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetentorAnexoArquivoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, detentorAnexoArquivo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detentorAnexoArquivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDetentorAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = detentorAnexoArquivoRepository.findAll().size();
        detentorAnexoArquivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetentorAnexoArquivoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detentorAnexoArquivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDetentorAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = detentorAnexoArquivoRepository.findAll().size();
        detentorAnexoArquivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetentorAnexoArquivoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detentorAnexoArquivo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDetentorAnexoArquivoWithPatch() throws Exception {
        // Initialize the database
        detentorAnexoArquivoRepository.saveAndFlush(detentorAnexoArquivo);

        int databaseSizeBeforeUpdate = detentorAnexoArquivoRepository.findAll().size();

        // Update the detentorAnexoArquivo using partial update
        DetentorAnexoArquivo partialUpdatedDetentorAnexoArquivo = new DetentorAnexoArquivo();
        partialUpdatedDetentorAnexoArquivo.setId(detentorAnexoArquivo.getId());

        partialUpdatedDetentorAnexoArquivo.dataCriacao(UPDATED_DATA_CRIACAO);

        restDetentorAnexoArquivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetentorAnexoArquivo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetentorAnexoArquivo))
            )
            .andExpect(status().isOk());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeUpdate);
        DetentorAnexoArquivo testDetentorAnexoArquivo = detentorAnexoArquivoList.get(detentorAnexoArquivoList.size() - 1);
        assertThat(testDetentorAnexoArquivo.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
    }

    @Test
    @Transactional
    void fullUpdateDetentorAnexoArquivoWithPatch() throws Exception {
        // Initialize the database
        detentorAnexoArquivoRepository.saveAndFlush(detentorAnexoArquivo);

        int databaseSizeBeforeUpdate = detentorAnexoArquivoRepository.findAll().size();

        // Update the detentorAnexoArquivo using partial update
        DetentorAnexoArquivo partialUpdatedDetentorAnexoArquivo = new DetentorAnexoArquivo();
        partialUpdatedDetentorAnexoArquivo.setId(detentorAnexoArquivo.getId());

        partialUpdatedDetentorAnexoArquivo.dataCriacao(UPDATED_DATA_CRIACAO);

        restDetentorAnexoArquivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetentorAnexoArquivo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetentorAnexoArquivo))
            )
            .andExpect(status().isOk());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeUpdate);
        DetentorAnexoArquivo testDetentorAnexoArquivo = detentorAnexoArquivoList.get(detentorAnexoArquivoList.size() - 1);
        assertThat(testDetentorAnexoArquivo.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
    }

    @Test
    @Transactional
    void patchNonExistingDetentorAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = detentorAnexoArquivoRepository.findAll().size();
        detentorAnexoArquivo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetentorAnexoArquivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, detentorAnexoArquivo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detentorAnexoArquivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDetentorAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = detentorAnexoArquivoRepository.findAll().size();
        detentorAnexoArquivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetentorAnexoArquivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detentorAnexoArquivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDetentorAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = detentorAnexoArquivoRepository.findAll().size();
        detentorAnexoArquivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetentorAnexoArquivoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detentorAnexoArquivo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetentorAnexoArquivo in the database
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDetentorAnexoArquivo() throws Exception {
        // Initialize the database
        detentorAnexoArquivoRepository.saveAndFlush(detentorAnexoArquivo);

        int databaseSizeBeforeDelete = detentorAnexoArquivoRepository.findAll().size();

        // Delete the detentorAnexoArquivo
        restDetentorAnexoArquivoMockMvc
            .perform(delete(ENTITY_API_URL_ID, detentorAnexoArquivo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetentorAnexoArquivo> detentorAnexoArquivoList = detentorAnexoArquivoRepository.findAll();
        assertThat(detentorAnexoArquivoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
