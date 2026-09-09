package com.afreen.jobmanagement.controller;

import com.afreen.jobmanagement.model.JobApplication;
import com.afreen.jobmanagement.service.JobApplicationService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:3000"
    })
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<JobApplication> getAllApplications() {
        return service.getAllApplications();
    }

    @GetMapping("/{id}")
    public JobApplication getApplicationById(@PathVariable Long id) {
        return service.getApplicationById(id);
    }

    @PostMapping
    public JobApplication createApplication(
            @Valid @RequestBody JobApplication application) {
        return service.createApplication(application);
    }

    @PutMapping("/{id}")
    public JobApplication updateApplication(
            @PathVariable Long id,
            @Valid @RequestBody JobApplication application) {
        return service.updateApplication(id, application);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        service.deleteApplication(id);
    }
    @GetMapping("/search")
    public List<JobApplication> searchApplications(
        @RequestParam(required = false) String company,
        @RequestParam(required = false) String status) {

    if (company != null && !company.isBlank()) {
        return service.searchByCompany(company);
    }

    if (status != null && !status.isBlank()) {
        return service.searchByStatus(status);
    }

    return service.getAllApplications();
    }
}