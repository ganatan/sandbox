public abstract class AbstractMessageReceiver extends StdMessageReceiver {
    protected AbstractMessageReceiver() {
        this(DefaultMessageConfiguration.INSTANCE);
    }

    protected AbstractMessageReceiver(MessageConfiguration configuration) {
        super(configuration);
    }
}
