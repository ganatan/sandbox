public class Main {
    public static void main(String[] args) {
        InterfaceLogger logger = new ConsoleLogger();

        MyReceiver receiver1 = new MyReceiver(logger);
        MyReceiver2 receiver2 = new MyReceiver2(logger);

        receiver1.receive("Bonjour");
        receiver2.receive("Bonjour");
    }
}
