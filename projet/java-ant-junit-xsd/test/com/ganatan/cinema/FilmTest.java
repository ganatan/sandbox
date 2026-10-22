package com.ganatan.cinema;

import com.ganatan.cinema.generated.Film;
import junit.framework.TestCase;

public class FilmTest extends TestCase {
    public void testFilmGenere() {
        Film film = new Film();
        film.setTitre("Alien");
        film.setAnnee(1979);
        assertEquals("Alien", film.getTitre());
        assertEquals(1979, film.getAnnee());
    }
}
