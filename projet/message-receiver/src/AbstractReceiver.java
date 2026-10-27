public abstract class AbstractReceiver extends Receiver {
    protected AbstractReceiver() {
        this(new ConsoleLogger());
    }

    protected AbstractReceiver(InterfaceLogger specificLogger) {
        this(specificLogger, "DEFAULT");
    }

    protected AbstractReceiver(InterfaceLogger specificLogger, String type) {
        super(specificLogger, type);
    }
}
