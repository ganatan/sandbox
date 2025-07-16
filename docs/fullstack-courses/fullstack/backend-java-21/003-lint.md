# Creer checkstyle.xml

<?xml version="1.0"?>
<!DOCTYPE module PUBLIC
          "-//Checkstyle//DTD Checkstyle Configuration 1.3//EN"
          "https://checkstyle.org/dtds/configuration_1_3.dtd">

<module name="Checker">
    
    <!-- Propriétés globales -->
    <property name="charset" value="UTF-8"/>
    <property name="severity" value="warning"/>
    
    <!-- Longueur des lignes -->
    <module name="LineLength">
        <property name="max" value="120"/>
    </module>
    
    <!-- Espaces inutiles -->
<!--     <module name="RegexpSingleline">
        <property name="format" value="\s+$"/>
        <property name="minimum" value="0"/>
        <property name="maximum" value="0"/>
        <property name="message" value="Trailing whitespace"/>
    </module>
 -->    
    <!-- TreeWalker pour les règles Java -->
    <module name="TreeWalker">
        
        <!-- IMPORTS -->
<!--         <module name="AvoidStarImport"/>
        <module name="UnusedImports"/>
        <module name="ImportOrder">
            <property name="groups" value="java,javax,jakarta,org,com"/>
            <property name="ordered" value="true"/>
            <property name="separated" value="true"/>
        </module>
 -->        
        <!-- NAMING -->
        <module name="TypeName"/>
        <module name="MethodName"/>
        <module name="ParameterName"/>
        <module name="LocalVariableName"/>
        <module name="PackageName">
            <property name="format" value="^[a-z]+(\.[a-z][a-z0-9]*)*$"/>
        </module>
        
        <!-- WHITESPACE -->
        <module name="EmptyForIteratorPad"/>
        <module name="GenericWhitespace"/>
        <module name="MethodParamPad"/>
        <module name="NoWhitespaceAfter"/>
        <module name="NoWhitespaceBefore"/>
        <module name="ParenPad"/>
        <module name="TypecastParenPad"/>
        <module name="WhitespaceAfter"/>
        <module name="WhitespaceAround"/>
        
        <!-- MODIFIERS -->
        <module name="ModifierOrder"/>
        <module name="RedundantModifier"/>
        
        <!-- BLOCKS -->
        <module name="EmptyBlock"/>
        <module name="LeftCurly"/>
        <module name="NeedBraces"/>
        <module name="RightCurly"/>
        
        <!-- CODING -->
        <module name="EmptyStatement"/>
        <module name="EqualsHashCode"/>
        <module name="IllegalInstantiation"/>
        <module name="SimplifyBooleanExpression"/>
        <module name="SimplifyBooleanReturn"/>
        
        <!-- DESIGN -->
<!--         <module name="FinalClass"/>
        <module name="HideUtilityClassConstructor"/>
        <module name="InterfaceIsType"/>
        <module name="VisibilityModifier">
            <property name="protectedAllowed" value="true"/>
        </module>
 -->        
        <!-- MISCELLANEOUS -->
        <module name="ArrayTypeStyle"/>
        <module name="UpperEll"/>
        
    </module>
    
</module>


# Rajout dans pom.xml d'un plugin

			<plugin>
			    <groupId>org.apache.maven.plugins</groupId>
			    <artifactId>maven-checkstyle-plugin</artifactId>
			    <version>3.6.0</version>
			    <configuration>
			        <configLocation>checkstyle.xml</configLocation>
			        <encoding>UTF-8</encoding>
			        <consoleOutput>true</consoleOutput>
			        <failsOnError>false</failsOnError>
			    </configuration>
			    <dependencies>
			        <dependency>
			            <groupId>com.puppycrawl.tools</groupId>
			            <artifactId>checkstyle</artifactId>
			            <version>10.12.4</version>
			        </dependency>
			    </dependencies>
			</plugin>
