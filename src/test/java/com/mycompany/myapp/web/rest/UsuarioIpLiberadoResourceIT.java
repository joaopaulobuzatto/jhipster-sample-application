package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.UsuarioIpLiberado;
import com.mycompany.myapp.repository.UsuarioIpLiberadoRepository;
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
 * Integration tests for the {@link UsuarioIpLiberadoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UsuarioIpLiberadoResourceIT {

    private static final String ENTITY_API_URL = "/api/usuario-ip-liberados";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UsuarioIpLiberadoRepository usuarioIpLiberadoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUsuarioIpLiberadoMockMvc;

    private UsuarioIpLiberado usuarioIpLiberado;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UsuarioIpLiberado createEntity(EntityManager em) {
        UsuarioIpLiberado usuarioIpLiberado = new UsuarioIpLiberado();
        return usuarioIpLiberado;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UsuarioIpLiberado createUpdatedEntity(EntityManager em) {
        UsuarioIpLiberado usuarioIpLiberado = new UsuarioIpLiberado();
        return usuarioIpLiberado;
    }

    @BeforeEach
    public void initTest() {
        usuarioIpLiberado = createEntity(em);
    }

    @Test
    @Transactional
    void createUsuarioIpLiberado() throws Exception {
        int databaseSizeBeforeCreate = usuarioIpLiberadoRepository.findAll().size();
        // Create the UsuarioIpLiberado
        restUsuarioIpLiberadoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarioIpLiberado))
            )
            .andExpect(status().isCreated());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeCreate + 1);
        UsuarioIpLiberado testUsuarioIpLiberado = usuarioIpLiberadoList.get(usuarioIpLiberadoList.size() - 1);
    }

    @Test
    @Transactional
    void createUsuarioIpLiberadoWithExistingId() throws Exception {
        // Create the UsuarioIpLiberado with an existing ID
        usuarioIpLiberado.setId(1L);

        int databaseSizeBeforeCreate = usuarioIpLiberadoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuarioIpLiberadoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarioIpLiberado))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUsuarioIpLiberados() throws Exception {
        // Initialize the database
        usuarioIpLiberadoRepository.saveAndFlush(usuarioIpLiberado);

        // Get all the usuarioIpLiberadoList
        restUsuarioIpLiberadoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuarioIpLiberado.getId().intValue())));
    }

    @Test
    @Transactional
    void getUsuarioIpLiberado() throws Exception {
        // Initialize the database
        usuarioIpLiberadoRepository.saveAndFlush(usuarioIpLiberado);

        // Get the usuarioIpLiberado
        restUsuarioIpLiberadoMockMvc
            .perform(get(ENTITY_API_URL_ID, usuarioIpLiberado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(usuarioIpLiberado.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingUsuarioIpLiberado() throws Exception {
        // Get the usuarioIpLiberado
        restUsuarioIpLiberadoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUsuarioIpLiberado() throws Exception {
        // Initialize the database
        usuarioIpLiberadoRepository.saveAndFlush(usuarioIpLiberado);

        int databaseSizeBeforeUpdate = usuarioIpLiberadoRepository.findAll().size();

        // Update the usuarioIpLiberado
        UsuarioIpLiberado updatedUsuarioIpLiberado = usuarioIpLiberadoRepository.findById(usuarioIpLiberado.getId()).get();
        // Disconnect from session so that the updates on updatedUsuarioIpLiberado are not directly saved in db
        em.detach(updatedUsuarioIpLiberado);

        restUsuarioIpLiberadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUsuarioIpLiberado.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUsuarioIpLiberado))
            )
            .andExpect(status().isOk());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeUpdate);
        UsuarioIpLiberado testUsuarioIpLiberado = usuarioIpLiberadoList.get(usuarioIpLiberadoList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingUsuarioIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = usuarioIpLiberadoRepository.findAll().size();
        usuarioIpLiberado.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioIpLiberadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, usuarioIpLiberado.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarioIpLiberado))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUsuarioIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = usuarioIpLiberadoRepository.findAll().size();
        usuarioIpLiberado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioIpLiberadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarioIpLiberado))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUsuarioIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = usuarioIpLiberadoRepository.findAll().size();
        usuarioIpLiberado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioIpLiberadoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarioIpLiberado))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUsuarioIpLiberadoWithPatch() throws Exception {
        // Initialize the database
        usuarioIpLiberadoRepository.saveAndFlush(usuarioIpLiberado);

        int databaseSizeBeforeUpdate = usuarioIpLiberadoRepository.findAll().size();

        // Update the usuarioIpLiberado using partial update
        UsuarioIpLiberado partialUpdatedUsuarioIpLiberado = new UsuarioIpLiberado();
        partialUpdatedUsuarioIpLiberado.setId(usuarioIpLiberado.getId());

        restUsuarioIpLiberadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuarioIpLiberado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuarioIpLiberado))
            )
            .andExpect(status().isOk());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeUpdate);
        UsuarioIpLiberado testUsuarioIpLiberado = usuarioIpLiberadoList.get(usuarioIpLiberadoList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateUsuarioIpLiberadoWithPatch() throws Exception {
        // Initialize the database
        usuarioIpLiberadoRepository.saveAndFlush(usuarioIpLiberado);

        int databaseSizeBeforeUpdate = usuarioIpLiberadoRepository.findAll().size();

        // Update the usuarioIpLiberado using partial update
        UsuarioIpLiberado partialUpdatedUsuarioIpLiberado = new UsuarioIpLiberado();
        partialUpdatedUsuarioIpLiberado.setId(usuarioIpLiberado.getId());

        restUsuarioIpLiberadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuarioIpLiberado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuarioIpLiberado))
            )
            .andExpect(status().isOk());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeUpdate);
        UsuarioIpLiberado testUsuarioIpLiberado = usuarioIpLiberadoList.get(usuarioIpLiberadoList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingUsuarioIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = usuarioIpLiberadoRepository.findAll().size();
        usuarioIpLiberado.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioIpLiberadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, usuarioIpLiberado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuarioIpLiberado))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUsuarioIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = usuarioIpLiberadoRepository.findAll().size();
        usuarioIpLiberado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioIpLiberadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuarioIpLiberado))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUsuarioIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = usuarioIpLiberadoRepository.findAll().size();
        usuarioIpLiberado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioIpLiberadoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuarioIpLiberado))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UsuarioIpLiberado in the database
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUsuarioIpLiberado() throws Exception {
        // Initialize the database
        usuarioIpLiberadoRepository.saveAndFlush(usuarioIpLiberado);

        int databaseSizeBeforeDelete = usuarioIpLiberadoRepository.findAll().size();

        // Delete the usuarioIpLiberado
        restUsuarioIpLiberadoMockMvc
            .perform(delete(ENTITY_API_URL_ID, usuarioIpLiberado.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UsuarioIpLiberado> usuarioIpLiberadoList = usuarioIpLiberadoRepository.findAll();
        assertThat(usuarioIpLiberadoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
