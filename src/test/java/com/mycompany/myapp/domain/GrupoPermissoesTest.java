package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GrupoPermissoesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GrupoPermissoes.class);
        GrupoPermissoes grupoPermissoes1 = new GrupoPermissoes();
        grupoPermissoes1.setId(1L);
        GrupoPermissoes grupoPermissoes2 = new GrupoPermissoes();
        grupoPermissoes2.setId(grupoPermissoes1.getId());
        assertThat(grupoPermissoes1).isEqualTo(grupoPermissoes2);
        grupoPermissoes2.setId(2L);
        assertThat(grupoPermissoes1).isNotEqualTo(grupoPermissoes2);
        grupoPermissoes1.setId(null);
        assertThat(grupoPermissoes1).isNotEqualTo(grupoPermissoes2);
    }
}
