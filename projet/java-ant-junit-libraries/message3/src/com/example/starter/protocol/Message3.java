package com.example.starter.protocol;

public class Message3 {
    public int calculate() {
        return new Message2().calculate() + 4;
    }
}
