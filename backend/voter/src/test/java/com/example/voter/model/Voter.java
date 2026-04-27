package com.example.voter.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "voters")
public class Voter {

    @Id
    private String id;

    private String lastName;
    private String firstName;
    private String middleName;
    private String suffix;

    private Address address;
    private String citizenship;
    private String civilStatus;
    private String sex;

    private String dateOfBirth;
    private String placeOfBirth;

    private Residence residence;
    private Flags flags;

    private String pwdDetails;
    private boolean accessiblePolling;

    private Parents parents;

    private String email;
    private Biometrics biometrics;

    @Data
    public static class Address {
        private String province;
        private String city;
        private String barangay;
        private String street;
    }

    @Data
    public static class Residence {
        private int cityYears;
        private int phYears;
    }

    @Data
    public static class Flags {
        private boolean indigenous;
        private boolean illiterate;
        private boolean pwd;
    }

    @Data
    public static class Parents {
        private String father;
        private String mother;
    }

    @Data
    public static class Biometrics {
        private boolean facial;
    }
}