import junit.framework.TestCase;

public class MessageTest extends TestCase {
    public void testCalculate() {
        Message message = new Message();
        System.out.println("00000000001");
        assertEquals(3, message.calculate());
    }
}
