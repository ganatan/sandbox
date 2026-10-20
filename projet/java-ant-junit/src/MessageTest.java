import junit.framework.TestCase;

public class MessageTest extends TestCase {
    public void testCalculate() {
        Message message = new Message();
        assertEquals(3, message.calculate());
    }
}
