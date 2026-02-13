package assignment.tourdefrance.service;

import assignment.tourdefrance.model.Rider;

import java.util.List;

public interface RiderService {
    Rider createRider(Rider rider);
    List<Rider> getAllRiders();
    Rider getRiderById(int riderId);
    Rider updateRider(int id, Rider rider);
    void deleteRider(int riderId);

}
