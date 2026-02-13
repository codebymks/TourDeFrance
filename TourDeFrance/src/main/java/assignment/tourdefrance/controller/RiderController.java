package assignment.tourdefrance.controller;

import assignment.tourdefrance.model.Rider;
import assignment.tourdefrance.service.RiderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/riders")
public class RiderController {

    @Autowired
    private RiderService riderService;

    @GetMapping()
    public List<Rider> getAllRiders() {
        return riderService.getAllRiders();
    }

    @GetMapping("/{id}")
    public Rider getRiderByID(@PathVariable int id) {
        return riderService.getRiderById(id);
    }

    @PostMapping
    public Rider AddRider(@RequestBody Rider rider) {
        return riderService.createRider(rider);
    }

    @PutMapping("/{id}")
    public Rider UpdateRider(@PathVariable int id, @RequestBody Rider newRider) {
        return riderService.updateRider(id, newRider);
    }

    @DeleteMapping("/{id}")
    public void DeleteRider(@PathVariable int id) {
       riderService.deleteRider(id);
    }
}
