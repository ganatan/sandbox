public abstract class Receiver {
    private final InterfaceLogger logger;
    private final String type;

    protected Receiver(InterfaceLogger logger, String type) {
        this.logger = logger;
        this.type = type;
    }

    public void receive(String message) {
        logger.log(type + " : " + message);
    }
}
