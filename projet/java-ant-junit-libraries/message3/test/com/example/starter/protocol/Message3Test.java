package com.example.starter.protocol;

import junit.framework.TestCase;

public class Message3Test extends TestCase {
    public void testCalculate() {
        Message3 message = new Message3();
        System.out.println("00000000001");
        assertEquals(10, message.calculate());
    }
}
