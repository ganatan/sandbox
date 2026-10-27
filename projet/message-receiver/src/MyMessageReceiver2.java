public class MyMessageReceiver2 extends AbstractMessageReceiver {
    public MyMessageReceiver2() {
        super(SpecialMessageConfiguration.INSTANCE);
    }

    public MyMessageReceiver2(MessageConfiguration configuration) {
        super(configuration);
    }
}
