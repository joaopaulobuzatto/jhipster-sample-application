package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.UsuarioGrupoPermissoes;
import com.mycompany.myapp.repository.UsuarioGrupoPermissoesRepository;
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
 * Integration tests for the {@link UsuarioGrupoPermissoesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UsuarioGrupoPermissoesResourceIT {

    private static final String ENTITY_API_URL = "/api/usuario-grupo-permissoes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UsuarioGrupoPermissoesRepository usuarioGrupoPermissoesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUsuarioGrupoPermissoesMockMvc;

    private UsuarioGrupoPermissoes usuarioGrupoPermissoes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UsuarioGrupoPermissoes createEntity(EntityManager em) {
        UsuarioGrupoPermissoes usuarioGrupoPermissoes = new UsuarioGrupoPermissoes();
        return usuarioGrupoPermissoes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UsuarioGrupoPermissoes createUpdatedEntity(EntityManager em) {
        UsuarioGrupoPermissoes usuarioGrupoPermissoes = new UsuarioGrupoPermissoes();
        return usuarioGrupoPermissoes;
    }

    @BeforeEach
    public void initTest() {
        usuarioGrupoPermissoes = createEntity(em);
    }

    @Test
    @Transactional
    void createUsuarioGrupoPermissoes() throws Exception {
        int databaseSizeBeforeCreate = usuarioGrupoPermissoesRepository.findAll().size();
        // Create the UsuarioGrupoPermissoes
        restUsuarioGrupoPermissoesMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarioGrupoPermissoes))
            )
            .andExpect(status().isCreated());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeCreate + 1);
        UsuarioGrupoPermissoes testUsuarioGrupoPermissoes = usuarioGrupoPermissoesList.get(usuarioGrupoPermissoesList.size() - 1);
    }

    @Test
    @Transactional
    void createUsuarioGrupoPermissoesWithExistingId() throws Exception {
        // Create the UsuarioGrupoPermissoes with an existing ID
        usuarioGrupoPermissoes.setId(1L);

        int databaseSizeBeforeCreate = usuarioGrupoPermissoesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuarioGrupoPermissoesMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarioGrupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUsuarioGrupoPermissoes() throws Exception {
        // Initialize the database
        usuarioGrupoPermissoesRepository.saveAndFlush(usuarioGrupoPermissoes);

        // Get all the usuarioGrupoPermissoesList
        restUsuarioGrupoPermissoesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuarioGrupoPermissoes.getId().intValue())));
    }

    @Test
    @Transactional
    void getUsuarioGrupoPermissoes() throws Exception {
        // Initialize the database
        usuarioGrupoPermissoesRepository.saveAndFlush(usuarioGrupoPermissoes);

        // Get the usuarioGrupoPermissoes
        restUsuarioGrupoPermissoesMockMvc
            .perform(get(ENTITY_API_URL_ID, usuarioGrupoPermissoes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(usuarioGrupoPermissoes.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingUsuarioGrupoPermissoes() throws Exception {
        // Get the usuarioGrupoPermissoes
        restUsuarioGrupoPermissoesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUsuarioGrupoPermissoes() throws Exception {
        // Initialize the database
        usuarioGrupoPermissoesRepository.saveAndFlush(usuarioGrupoPermissoes);

        int databaseSizeBeforeUpdate = usuarioGrupoPermissoesRepository.findAll().size();

        // Update the usuarioGrupoPermissoes
        UsuarioGrupoPermissoes updatedUsuarioGrupoPermissoes = usuarioGrupoPermissoesRepository
            .findById(usuarioGrupoPermissoes.getId())
            .get();
        // Disconnect from session so that the updates on updatedUsuarioGrupoPermissoes are not directly saved in db
        em.detach(updatedUsuarioGrupoPermissoes);

        restUsuarioGrupoPermissoesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUsuarioGrupoPermissoes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUsuarioGrupoPermissoes))
            )
            .andExpect(status().isOk());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
        UsuarioGrupoPermissoes testUsuarioGrupoPermissoes = usuarioGrupoPermissoesList.get(usuarioGrupoPermissoesList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingUsuarioGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = usuarioGrupoPermissoesRepository.findAll().size();
        usuarioGrupoPermissoes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioGrupoPermissoesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, usuarioGrupoPermissoes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarioGrupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUsuarioGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = usuarioGrupoPermissoesRepository.findAll().size();
        usuarioGrupoPermissoes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioGrupoPermissoesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarioGrupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUsuarioGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = usuarioGrupoPermissoesRepository.findAll().size();
        usuarioGrupoPermissoes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioGrupoPermissoesMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarioGrupoPermissoes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUsuarioGrupoPermissoesWithPatch() throws Exception {
        // Initialize the database
        usuarioGrupoPermissoesRepository.saveAndFlush(usuarioGrupoPermissoes);

        int databaseSizeBeforeUpdate = usuarioGrupoPermissoesRepository.findAll().size();

        // Update the usuarioGrupoPermissoes using partial update
        UsuarioGrupoPermissoes partialUpdatedUsuarioGrupoPermissoes = new UsuarioGrupoPermissoes();
        partialUpdatedUsuarioGrupoPermissoes.setId(usuarioGrupoPermissoes.getId());

        restUsuarioGrupoPermissoesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuarioGrupoPermissoes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuarioGrupoPermissoes))
            )
            .andExpect(status().isOk());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
        UsuarioGrupoPermissoes testUsuarioGrupoPermissoes = usuarioGrupoPermissoesList.get(usuarioGrupoPermissoesList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateUsuarioGrupoPermissoesWithPatch() throws Exception {
        // Initialize the database
        usuarioGrupoPermissoesRepository.saveAndFlush(usuarioGrupoPermissoes);

        int databaseSizeBeforeUpdate = usuarioGrupoPermissoesRepository.findAll().size();

        // Update the usuarioGrupoPermissoes using partial update
        UsuarioGrupoPermissoes partialUpdatedUsuarioGrupoPermissoes = new UsuarioGrupoPermissoes();
        partialUpdatedUsuarioGrupoPermissoes.setId(usuarioGrupoPermissoes.getId());

        restUsuarioGrupoPermissoesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuarioGrupoPermissoes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuarioGrupoPermissoes))
            )
            .andExpect(status().isOk());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
        UsuarioGrupoPermissoes testUsuarioGrupoPermissoes = usuarioGrupoPermissoesList.get(usuarioGrupoPermissoesList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingUsuarioGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = usuarioGrupoPermissoesRepository.findAll().size();
        usuarioGrupoPermissoes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioGrupoPermissoesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, usuarioGrupoPermissoes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuarioGrupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUsuarioGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = usuarioGrupoPermissoesRepository.findAll().size();
        usuarioGrupoPermissoes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioGrupoPermissoesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuarioGrupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUsuarioGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = usuarioGrupoPermissoesRepository.findAll().size();
        usuarioGrupoPermissoes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioGrupoPermissoesMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuarioGrupoPermissoes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UsuarioGrupoPermissoes in the database
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUsuarioGrupoPermissoes() throws Exception {
        // Initialize the database
        usuarioGrupoPermissoesRepository.saveAndFlush(usuarioGrupoPermissoes);

        int databaseSizeBeforeDelete = usuarioGrupoPermissoesRepository.findAll().size();

        // Delete the usuarioGrupoPermissoes
        restUsuarioGrupoPermissoesMockMvc
            .perform(delete(ENTITY_API_URL_ID, usuarioGrupoPermissoes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UsuarioGrupoPermissoes> usuarioGrupoPermissoesList = usuarioGrupoPermissoesRepository.findAll();
        assertThat(usuarioGrupoPermissoesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
