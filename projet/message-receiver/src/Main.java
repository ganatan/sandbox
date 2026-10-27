public class Main {
    public static void main(String[] args) {
        MyMessageReceiver receiver1 = new MyMessageReceiver();
        MyMessageReceiver2 receiver2 = new MyMessageReceiver2();
        MyMessageReceiver2 receiver3 = new MyMessageReceiver2(DefaultMessageConfiguration.INSTANCE);

        receiver1.receive("Bonjour du recepteur 1");
        receiver2.receive("Bonjour du recepteur 2");
        receiver3.receive("Configuration choisie dans Main");
    }
}
