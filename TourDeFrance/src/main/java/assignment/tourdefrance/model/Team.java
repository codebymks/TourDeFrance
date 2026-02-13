package assignment.tourdefrance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int teamId;
    private String teamName;
    @Enumerated(EnumType.STRING)
    private Country country;

    @JsonManagedReference
    @OneToMany(mappedBy = "team")
    private List<Rider> riderList;

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public List<Rider> getRiderList() {
        return riderList;
    }

    public void setRiderList(List<Rider> riderList) {
        this.riderList = riderList;
    }
}
