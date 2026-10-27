public class Main {
    public static void main(String[] args) {
        MyReceiver receiver1 = new MyReceiver();
        MyReceiver2 receiver2 = new MyReceiver2();

        receiver1.receive("Bonjour");
        receiver2.receive("Bonjour");
    }
}
