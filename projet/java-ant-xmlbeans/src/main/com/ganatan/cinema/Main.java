package com.ganatan.cinema;

import com.ganatan.cinema.generated.FilmDocument;

public class Main {
    public static void main(String[] args) {
        FilmDocument document = FilmDocument.Factory.newInstance();
        FilmDocument.Film film = document.addNewFilm();
        film.setTitre("Alien");
        film.setAnnee(1979);
        System.out.println(film.getTitre() + " (" + film.getAnnee() + ")");
    }
}
