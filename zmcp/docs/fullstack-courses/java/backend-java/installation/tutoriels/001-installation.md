Ajouter les depedences

<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>postgresql</artifactId>
  <version>42.7.2</version>
</dependency>


creer les fichiers 

Database.java


package com.ganatan.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {

    private static final String DB_USER = System.getenv().getOrDefault("DB_USER", "postgres");
    private static final String DB_PASSWORD = System.getenv().getOrDefault("DB_PASSWORD", "Trustno1");
    private static final String DB_HOST = System.getenv().getOrDefault("DB_HOST", "localhost");
    private static final String DB_PORT = System.getenv().getOrDefault("DB_PORT", "5432");
    private static final String DB_NAME = System.getenv().getOrDefault("DB_NAME", "backend_javascript");

    private static final String JDBC_URL = "jdbc:postgresql://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME;
    
    public static Connection getConnection() throws SQLException {
    	System.out.println("00000000001:Database:");
    	System.out.println("00000000002:Database:" + JDBC_URL);
    	System.out.println("00000000003':Database:" + DB_USER);
    	System.out.println("00000000004:Database:" + DB_PASSWORD);
        return DriverManager.getConnection(JDBC_URL, DB_USER, DB_PASSWORD);
    }
}



ProfessionRepositoryPg.java


package com.ganatan.modules.profession;

import java.sql.*;
import java.util.*;

import com.ganatan.config.Database;

public class ProfessionRepositoryPg {

    public Map<String, Object> getItems(int offset, int limit) {
    	System.out.println("00000000001:ProfessionRepositoryPg");
        String sqlCount = "SELECT COUNT(*) AS count FROM profession";
        String sqlData = "SELECT id, name FROM profession ORDER BY name ASC LIMIT ? OFFSET ?";
        
        System.out.println("00000000002:ProfessionRepositoryPg");
        
        try (Connection conn = Database.getConnection()) {
            int totalItems;
            try (PreparedStatement ps = conn.prepareStatement(sqlCount);
                 ResultSet rs = ps.executeQuery()) {
                rs.next();
                totalItems = rs.getInt("count");
            }

            List<Profession> data = new ArrayList<>();
            try (PreparedStatement ps = conn.prepareStatement(sqlData)) {
                ps.setInt(1, limit);
                ps.setInt(2, offset);
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    data.add(new Profession(rs.getInt("id"), rs.getString("name")));
                }
            }

            int currentPage = (offset / limit) + 1;
            int totalPages = (int) Math.ceil((double) totalItems / limit);

            Map<String, Object> pagination = Map.of(
                "currentPage", currentPage,
                "perPage", limit,
                "totalItems", totalItems,
                "totalPages", totalPages
            );

            return Map.of("metadata", Map.of("pagination", pagination), "data", data);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Optional<Profession> getItemById(int id) {
        String sql = "SELECT id, name FROM profession WHERE id = ?";
        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return Optional.of(new Profession(rs.getInt("id"), rs.getString("name")));
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Profession createItem(Profession profession) {
        String sql = "INSERT INTO profession (name) VALUES (?) RETURNING id, name";
        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, profession.getName());
            ResultSet rs = ps.executeQuery();
            rs.next();
            return new Profession(rs.getInt("id"), rs.getString("name"));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Optional<Profession> updateItem(int id, Profession updated) {
        String sql = "UPDATE profession SET name = ? WHERE id = ? RETURNING id, name";
        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, updated.getName());
            ps.setInt(2, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return Optional.of(new Profession(rs.getInt("id"), rs.getString("name")));
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean deleteItem(int id) {
        String sql = "DELETE FROM profession WHERE id = ?";
        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean existsByName(String name) {
        String sql = "SELECT 1 FROM profession WHERE LOWER(name) = LOWER(?) LIMIT 1";
        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}

