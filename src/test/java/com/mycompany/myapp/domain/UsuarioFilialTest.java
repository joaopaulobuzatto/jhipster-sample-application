package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UsuarioFilialTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsuarioFilial.class);
        UsuarioFilial usuarioFilial1 = new UsuarioFilial();
        usuarioFilial1.setId(1L);
        UsuarioFilial usuarioFilial2 = new UsuarioFilial();
        usuarioFilial2.setId(usuarioFilial1.getId());
        assertThat(usuarioFilial1).isEqualTo(usuarioFilial2);
        usuarioFilial2.setId(2L);
        assertThat(usuarioFilial1).isNotEqualTo(usuarioFilial2);
        usuarioFilial1.setId(null);
        assertThat(usuarioFilial1).isNotEqualTo(usuarioFilial2);
    }
}
