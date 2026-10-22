package com.ganatan.cinema.generic;

import com.ganatan.cinema.model.Movie;
import java.util.List;

public final class GenericUtils {
    private GenericUtils() {
    }

    public static <T> T first(List<T> values) {
        if (values.isEmpty()) {
            return null;
        }
        return values.get(0);
    }

    public static void printAll(List<?> values) {
        for (Object value : values) {
            System.out.println("Element : " + value);
        }
    }

    public static double sum(List<? extends Number> values) {
        double result = 0;
        for (Number value : values) {
            result += value.doubleValue();
        }
        return result;
    }

    public static void addMovie(List<? super Movie> values, Movie movie) {
        values.add(movie);
    }
}
