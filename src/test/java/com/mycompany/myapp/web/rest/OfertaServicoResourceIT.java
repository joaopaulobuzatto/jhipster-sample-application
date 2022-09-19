package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.OfertaServico;
import com.mycompany.myapp.repository.OfertaServicoRepository;
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
 * Integration tests for the {@link OfertaServicoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OfertaServicoResourceIT {

    private static final String ENTITY_API_URL = "/api/oferta-servicos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OfertaServicoRepository ofertaServicoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOfertaServicoMockMvc;

    private OfertaServico ofertaServico;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OfertaServico createEntity(EntityManager em) {
        OfertaServico ofertaServico = new OfertaServico();
        return ofertaServico;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OfertaServico createUpdatedEntity(EntityManager em) {
        OfertaServico ofertaServico = new OfertaServico();
        return ofertaServico;
    }

    @BeforeEach
    public void initTest() {
        ofertaServico = createEntity(em);
    }

    @Test
    @Transactional
    void createOfertaServico() throws Exception {
        int databaseSizeBeforeCreate = ofertaServicoRepository.findAll().size();
        // Create the OfertaServico
        restOfertaServicoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ofertaServico)))
            .andExpect(status().isCreated());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeCreate + 1);
        OfertaServico testOfertaServico = ofertaServicoList.get(ofertaServicoList.size() - 1);
    }

    @Test
    @Transactional
    void createOfertaServicoWithExistingId() throws Exception {
        // Create the OfertaServico with an existing ID
        ofertaServico.setId(1L);

        int databaseSizeBeforeCreate = ofertaServicoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOfertaServicoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ofertaServico)))
            .andExpect(status().isBadRequest());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOfertaServicos() throws Exception {
        // Initialize the database
        ofertaServicoRepository.saveAndFlush(ofertaServico);

        // Get all the ofertaServicoList
        restOfertaServicoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ofertaServico.getId().intValue())));
    }

    @Test
    @Transactional
    void getOfertaServico() throws Exception {
        // Initialize the database
        ofertaServicoRepository.saveAndFlush(ofertaServico);

        // Get the ofertaServico
        restOfertaServicoMockMvc
            .perform(get(ENTITY_API_URL_ID, ofertaServico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ofertaServico.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingOfertaServico() throws Exception {
        // Get the ofertaServico
        restOfertaServicoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOfertaServico() throws Exception {
        // Initialize the database
        ofertaServicoRepository.saveAndFlush(ofertaServico);

        int databaseSizeBeforeUpdate = ofertaServicoRepository.findAll().size();

        // Update the ofertaServico
        OfertaServico updatedOfertaServico = ofertaServicoRepository.findById(ofertaServico.getId()).get();
        // Disconnect from session so that the updates on updatedOfertaServico are not directly saved in db
        em.detach(updatedOfertaServico);

        restOfertaServicoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOfertaServico.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOfertaServico))
            )
            .andExpect(status().isOk());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeUpdate);
        OfertaServico testOfertaServico = ofertaServicoList.get(ofertaServicoList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingOfertaServico() throws Exception {
        int databaseSizeBeforeUpdate = ofertaServicoRepository.findAll().size();
        ofertaServico.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOfertaServicoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ofertaServico.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ofertaServico))
            )
            .andExpect(status().isBadRequest());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOfertaServico() throws Exception {
        int databaseSizeBeforeUpdate = ofertaServicoRepository.findAll().size();
        ofertaServico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOfertaServicoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ofertaServico))
            )
            .andExpect(status().isBadRequest());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOfertaServico() throws Exception {
        int databaseSizeBeforeUpdate = ofertaServicoRepository.findAll().size();
        ofertaServico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOfertaServicoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ofertaServico)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOfertaServicoWithPatch() throws Exception {
        // Initialize the database
        ofertaServicoRepository.saveAndFlush(ofertaServico);

        int databaseSizeBeforeUpdate = ofertaServicoRepository.findAll().size();

        // Update the ofertaServico using partial update
        OfertaServico partialUpdatedOfertaServico = new OfertaServico();
        partialUpdatedOfertaServico.setId(ofertaServico.getId());

        restOfertaServicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOfertaServico.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOfertaServico))
            )
            .andExpect(status().isOk());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeUpdate);
        OfertaServico testOfertaServico = ofertaServicoList.get(ofertaServicoList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateOfertaServicoWithPatch() throws Exception {
        // Initialize the database
        ofertaServicoRepository.saveAndFlush(ofertaServico);

        int databaseSizeBeforeUpdate = ofertaServicoRepository.findAll().size();

        // Update the ofertaServico using partial update
        OfertaServico partialUpdatedOfertaServico = new OfertaServico();
        partialUpdatedOfertaServico.setId(ofertaServico.getId());

        restOfertaServicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOfertaServico.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOfertaServico))
            )
            .andExpect(status().isOk());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeUpdate);
        OfertaServico testOfertaServico = ofertaServicoList.get(ofertaServicoList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingOfertaServico() throws Exception {
        int databaseSizeBeforeUpdate = ofertaServicoRepository.findAll().size();
        ofertaServico.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOfertaServicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ofertaServico.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ofertaServico))
            )
            .andExpect(status().isBadRequest());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOfertaServico() throws Exception {
        int databaseSizeBeforeUpdate = ofertaServicoRepository.findAll().size();
        ofertaServico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOfertaServicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ofertaServico))
            )
            .andExpect(status().isBadRequest());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOfertaServico() throws Exception {
        int databaseSizeBeforeUpdate = ofertaServicoRepository.findAll().size();
        ofertaServico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOfertaServicoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ofertaServico))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OfertaServico in the database
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOfertaServico() throws Exception {
        // Initialize the database
        ofertaServicoRepository.saveAndFlush(ofertaServico);

        int databaseSizeBeforeDelete = ofertaServicoRepository.findAll().size();

        // Delete the ofertaServico
        restOfertaServicoMockMvc
            .perform(delete(ENTITY_API_URL_ID, ofertaServico.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OfertaServico> ofertaServicoList = ofertaServicoRepository.findAll();
        assertThat(ofertaServicoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
