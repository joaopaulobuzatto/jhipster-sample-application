package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UsuarioGrupoPermissoesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsuarioGrupoPermissoes.class);
        UsuarioGrupoPermissoes usuarioGrupoPermissoes1 = new UsuarioGrupoPermissoes();
        usuarioGrupoPermissoes1.setId(1L);
        UsuarioGrupoPermissoes usuarioGrupoPermissoes2 = new UsuarioGrupoPermissoes();
        usuarioGrupoPermissoes2.setId(usuarioGrupoPermissoes1.getId());
        assertThat(usuarioGrupoPermissoes1).isEqualTo(usuarioGrupoPermissoes2);
        usuarioGrupoPermissoes2.setId(2L);
        assertThat(usuarioGrupoPermissoes1).isNotEqualTo(usuarioGrupoPermissoes2);
        usuarioGrupoPermissoes1.setId(null);
        assertThat(usuarioGrupoPermissoes1).isNotEqualTo(usuarioGrupoPermissoes2);
    }
}
