package com.ganatan.cinema.generic;

public class StructTypeHome<E> {
    private final Class<E> type;
    private final E value;

    public StructTypeHome(Class<E> type, E value) {
        this.type = type;
        this.value = type.cast(value);
    }

    public Class<E> getType() {
        return type;
    }

    public E getValue() {
        return value;
    }
}
