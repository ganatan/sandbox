public class MyReceiver2 extends AbstractReceiver {
    public MyReceiver2() {
        this(new ConsoleLogger());
    }

    public MyReceiver2(InterfaceLogger logger) {
        super(logger, "SPECIAL");
    }
}
