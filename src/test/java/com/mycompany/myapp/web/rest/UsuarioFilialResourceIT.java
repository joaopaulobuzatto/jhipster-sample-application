package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.UsuarioFilial;
import com.mycompany.myapp.repository.UsuarioFilialRepository;
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
 * Integration tests for the {@link UsuarioFilialResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UsuarioFilialResourceIT {

    private static final String ENTITY_API_URL = "/api/usuario-filials";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UsuarioFilialRepository usuarioFilialRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUsuarioFilialMockMvc;

    private UsuarioFilial usuarioFilial;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UsuarioFilial createEntity(EntityManager em) {
        UsuarioFilial usuarioFilial = new UsuarioFilial();
        return usuarioFilial;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UsuarioFilial createUpdatedEntity(EntityManager em) {
        UsuarioFilial usuarioFilial = new UsuarioFilial();
        return usuarioFilial;
    }

    @BeforeEach
    public void initTest() {
        usuarioFilial = createEntity(em);
    }

    @Test
    @Transactional
    void createUsuarioFilial() throws Exception {
        int databaseSizeBeforeCreate = usuarioFilialRepository.findAll().size();
        // Create the UsuarioFilial
        restUsuarioFilialMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarioFilial)))
            .andExpect(status().isCreated());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeCreate + 1);
        UsuarioFilial testUsuarioFilial = usuarioFilialList.get(usuarioFilialList.size() - 1);
    }

    @Test
    @Transactional
    void createUsuarioFilialWithExistingId() throws Exception {
        // Create the UsuarioFilial with an existing ID
        usuarioFilial.setId(1L);

        int databaseSizeBeforeCreate = usuarioFilialRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuarioFilialMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarioFilial)))
            .andExpect(status().isBadRequest());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUsuarioFilials() throws Exception {
        // Initialize the database
        usuarioFilialRepository.saveAndFlush(usuarioFilial);

        // Get all the usuarioFilialList
        restUsuarioFilialMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuarioFilial.getId().intValue())));
    }

    @Test
    @Transactional
    void getUsuarioFilial() throws Exception {
        // Initialize the database
        usuarioFilialRepository.saveAndFlush(usuarioFilial);

        // Get the usuarioFilial
        restUsuarioFilialMockMvc
            .perform(get(ENTITY_API_URL_ID, usuarioFilial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(usuarioFilial.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingUsuarioFilial() throws Exception {
        // Get the usuarioFilial
        restUsuarioFilialMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUsuarioFilial() throws Exception {
        // Initialize the database
        usuarioFilialRepository.saveAndFlush(usuarioFilial);

        int databaseSizeBeforeUpdate = usuarioFilialRepository.findAll().size();

        // Update the usuarioFilial
        UsuarioFilial updatedUsuarioFilial = usuarioFilialRepository.findById(usuarioFilial.getId()).get();
        // Disconnect from session so that the updates on updatedUsuarioFilial are not directly saved in db
        em.detach(updatedUsuarioFilial);

        restUsuarioFilialMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUsuarioFilial.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUsuarioFilial))
            )
            .andExpect(status().isOk());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeUpdate);
        UsuarioFilial testUsuarioFilial = usuarioFilialList.get(usuarioFilialList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingUsuarioFilial() throws Exception {
        int databaseSizeBeforeUpdate = usuarioFilialRepository.findAll().size();
        usuarioFilial.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioFilialMockMvc
            .perform(
                put(ENTITY_API_URL_ID, usuarioFilial.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarioFilial))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUsuarioFilial() throws Exception {
        int databaseSizeBeforeUpdate = usuarioFilialRepository.findAll().size();
        usuarioFilial.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioFilialMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarioFilial))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUsuarioFilial() throws Exception {
        int databaseSizeBeforeUpdate = usuarioFilialRepository.findAll().size();
        usuarioFilial.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioFilialMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarioFilial)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUsuarioFilialWithPatch() throws Exception {
        // Initialize the database
        usuarioFilialRepository.saveAndFlush(usuarioFilial);

        int databaseSizeBeforeUpdate = usuarioFilialRepository.findAll().size();

        // Update the usuarioFilial using partial update
        UsuarioFilial partialUpdatedUsuarioFilial = new UsuarioFilial();
        partialUpdatedUsuarioFilial.setId(usuarioFilial.getId());

        restUsuarioFilialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuarioFilial.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuarioFilial))
            )
            .andExpect(status().isOk());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeUpdate);
        UsuarioFilial testUsuarioFilial = usuarioFilialList.get(usuarioFilialList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateUsuarioFilialWithPatch() throws Exception {
        // Initialize the database
        usuarioFilialRepository.saveAndFlush(usuarioFilial);

        int databaseSizeBeforeUpdate = usuarioFilialRepository.findAll().size();

        // Update the usuarioFilial using partial update
        UsuarioFilial partialUpdatedUsuarioFilial = new UsuarioFilial();
        partialUpdatedUsuarioFilial.setId(usuarioFilial.getId());

        restUsuarioFilialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuarioFilial.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuarioFilial))
            )
            .andExpect(status().isOk());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeUpdate);
        UsuarioFilial testUsuarioFilial = usuarioFilialList.get(usuarioFilialList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingUsuarioFilial() throws Exception {
        int databaseSizeBeforeUpdate = usuarioFilialRepository.findAll().size();
        usuarioFilial.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioFilialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, usuarioFilial.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuarioFilial))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUsuarioFilial() throws Exception {
        int databaseSizeBeforeUpdate = usuarioFilialRepository.findAll().size();
        usuarioFilial.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioFilialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuarioFilial))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUsuarioFilial() throws Exception {
        int databaseSizeBeforeUpdate = usuarioFilialRepository.findAll().size();
        usuarioFilial.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioFilialMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(usuarioFilial))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UsuarioFilial in the database
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUsuarioFilial() throws Exception {
        // Initialize the database
        usuarioFilialRepository.saveAndFlush(usuarioFilial);

        int databaseSizeBeforeDelete = usuarioFilialRepository.findAll().size();

        // Delete the usuarioFilial
        restUsuarioFilialMockMvc
            .perform(delete(ENTITY_API_URL_ID, usuarioFilial.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UsuarioFilial> usuarioFilialList = usuarioFilialRepository.findAll();
        assertThat(usuarioFilialList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
