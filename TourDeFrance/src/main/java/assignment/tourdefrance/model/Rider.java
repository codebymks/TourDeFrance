package assignment.tourdefrance.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class Rider {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int riderId;
    private String firstName;
    private String lastName;
    private int age;
    private int totalTime;
    private int sprintPoint;
    private int mountainPoint;

    @Enumerated(EnumType.STRING)
    private Country country;


    @ManyToOne
    @JoinColumn(name = "teamId")
    @JsonIgnoreProperties("riderList")
    private Team team;

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public int getMountainPoint() {
        return mountainPoint;
    }

    public void setMountainPoint(int mountainPoint) {
        this.mountainPoint = mountainPoint;
    }

    public int getSprintPoint() {
        return sprintPoint;
    }

    public void setSprintPoint(int sprintPoint) {
        this.sprintPoint = sprintPoint;
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public int getRiderId() {
        return riderId;
    }

    public void setRiderId(int riderId) {
        this.riderId = riderId;
    }
}
