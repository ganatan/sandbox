package com.example.starter.protocol;

import junit.framework.TestCase;

public class Message2Test extends TestCase {
    public void testCalculate() {
        Message2 message = new Message2();
        System.out.println("00000000001");
        assertEquals(6, message.calculate());
    }
}
