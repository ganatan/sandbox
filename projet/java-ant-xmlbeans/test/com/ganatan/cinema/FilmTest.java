package com.ganatan.cinema;

import com.ganatan.cinema.generated.FilmDocument;
import junit.framework.TestCase;

public class FilmTest extends TestCase {
    public void testFilmGenere() {
        FilmDocument document = FilmDocument.Factory.newInstance();
        FilmDocument.Film film = document.addNewFilm();
        film.setTitre("Alien");
        film.setAnnee(1979);
        assertEquals("Alien", film.getTitre());
        assertEquals(1979, film.getAnnee());
    }
}
