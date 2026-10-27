public abstract class AbstractReceiver extends Receiver {
    private static final InterfaceLogger LOGGER = new ConsoleLogger();

    public AbstractReceiver() {
        this(LOGGER);
    }

    public AbstractReceiver(InterfaceLogger specificLogger) {
        this(specificLogger, "DEFAULT");
    }

    public AbstractReceiver(InterfaceLogger specificLogger, String type) {
        super(specificLogger, type);
    }
}
