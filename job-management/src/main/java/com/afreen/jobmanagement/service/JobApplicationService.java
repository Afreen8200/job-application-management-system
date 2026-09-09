package com.afreen.jobmanagement.service;

import com.afreen.jobmanagement.exception.ResourceNotFoundException;
import com.afreen.jobmanagement.model.JobApplication;
import com.afreen.jobmanagement.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    public List<JobApplication> getAllApplications() {
        return repository.findAll();
    }

    public JobApplication getApplicationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Application not found with id: " + id)
                );
    }

    public JobApplication createApplication(JobApplication application) {
        return repository.save(application);
    }

    public JobApplication updateApplication(Long id, JobApplication updated) {

        JobApplication existing = getApplicationById(id);

        existing.setCompanyName(updated.getCompanyName());
        existing.setJobTitle(updated.getJobTitle());
        existing.setLocation(updated.getLocation());
        existing.setStatus(updated.getStatus());
        existing.setAppliedDate(updated.getAppliedDate());
        existing.setNotes(updated.getNotes());

        return repository.save(existing);
    }

    public void deleteApplication(Long id) {
        repository.deleteById(id);
    }
    public List<JobApplication> searchByCompany(String company) {
    return repository.findByCompanyNameContainingIgnoreCase(company);
    }

    public List<JobApplication> searchByStatus(String status) {
    return repository.findByStatusIgnoreCase(status);
    }
}