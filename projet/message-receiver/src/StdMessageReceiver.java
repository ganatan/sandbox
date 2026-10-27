public abstract class StdMessageReceiver {
    private final MessageConfiguration configuration;

    protected StdMessageReceiver(MessageConfiguration configuration) {
        this.configuration = configuration;
    }

    public void receive(String message) {
        System.out.println(configuration.getName() + " : " + message);
    }
}
