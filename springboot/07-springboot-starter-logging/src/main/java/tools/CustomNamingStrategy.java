package tools;

import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.naming.PhysicalNamingStrategy;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CustomNamingStrategy implements PhysicalNamingStrategy {

	private static String dbClient;

	public CustomNamingStrategy(@Value("${app.dbclient}") String dbClient) {
		CustomNamingStrategy.dbClient = dbClient;
	}

	@Override
	public Identifier toPhysicalCatalogName(Identifier name, JdbcEnvironment context) {
		return name;
	}

	@Override
	public Identifier toPhysicalSchemaName(Identifier name, JdbcEnvironment context) {
		return name;
	}

	@Override
	public Identifier toPhysicalTableName(Identifier name, JdbcEnvironment context) {
		if (name == null)
			return null;
		String tableName = name.getText();
		if ("oracle".equalsIgnoreCase(dbClient)) {
			tableName = "starter_" + tableName;
		}
		System.out.println("00000000001:toPhysicalTableName:" + tableName);
		return Identifier.toIdentifier(tableName);
	}

	@Override
	public Identifier toPhysicalSequenceName(Identifier name, JdbcEnvironment context) {
		return name;
	}

	@Override
	public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment context) {
		return name;
	}
}
