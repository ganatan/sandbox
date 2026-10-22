package com.ganatan.cinema;

import com.ganatan.cinema.generated.Film;

public class Main {
    public static void main(String[] args) {
        Film film = new Film();
        film.setTitre("Alien");
        film.setAnnee(1979);
        System.out.println(film.getTitre() + " (" + film.getAnnee() + ")");
    }
}
