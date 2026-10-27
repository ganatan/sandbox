public abstract class AbstractReceiver extends Receiver {
    protected AbstractReceiver(InterfaceLogger logger) {
        this(logger, "DEFAULT");
    }

    protected AbstractReceiver(InterfaceLogger logger, String type) {
        super(logger, type);
    }
}
